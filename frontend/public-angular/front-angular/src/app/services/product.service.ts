import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

import { Product } from '../interfaces/product.interface';
import { Category, CategoryWithProducts } from '../interfaces/category.interface';

import { IndexedDbService } from './index-db.service';
import { catchError, map, tap, throwError, from, switchMap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private db = inject(IndexedDbService);

  private apiUrl = environment.apiUrl;
  private baseUrl = environment.storageUrl;

  private allProducts = signal<Product[]>([]);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  categoriesWithProducts = signal<CategoryWithProducts[]>([]);

  loadCategoriesWithProducts() {
    return from(this.db.getAll('categoriesWithProducts')).pipe(
      switchMap((cached) => {
        if (cached.length > 0) {
          console.log('Cargando categoriesWithProducts desde IndexedDB');

          this.categoriesWithProducts.set(cached);

          // reconstruimos products desde cache
          const allProducts = cached.flatMap((cat) => cat.products);
          this.products.set(allProducts);
          this.allProducts.set(allProducts);

          return of(cached);
        }

        console.log('Llamando a API');

        return this.http
          .get<{ data: CategoryWithProducts[] }>(`${this.apiUrl}/categories-with-products`)
          .pipe(
            map((resp) =>
              resp.data.map((cat) => ({
                ...cat,
                products: cat.products.map((prod) => ({
                  ...prod,
                  image: `${this.baseUrl}${prod.image}`,
                })),
              })),
            ),

            tap(async (categories) => {
              this.categoriesWithProducts.set(categories);
              const allProducts = categories.flatMap((cat) => cat.products);
              this.products.set(allProducts);
              this.allProducts.set(allProducts);

              try {
                await this.db.clear('categoriesWithProducts');
                await this.db.saveAll('categoriesWithProducts', categories);
              } catch (e) {
                console.error('Error guardando en IndexedDB', e);
              }
            }),
          );
      }),

      catchError((err) => {
        console.error('Error en categories-with-products', err);
        return throwError(() => err);
      }),
    );
  }

  loadProducts() {
    return from(this.db.getAll('products')).pipe(
      switchMap((cached) => {
        if (cached.length > 0) {
          console.log('📦 products desde IndexedDB');
          return of(cached);
        }

        console.log('🌐 API products');

        return this.http.get<{ data: Product[] }>(`${this.apiUrl}/products`).pipe(
          map((resp) =>
            resp.data.map((prod) => ({
              ...prod,
              image: `${this.baseUrl}${prod.image}`,
            })),
          ),

          tap(async (products) => {
            try {
              await this.db.clear('products');
              await this.db.saveAll('products', products);
            } catch (e) {
              console.error('Error guardando products', e);
            }
          }),
        );
      }),

      catchError((err) => {
        console.error('Error loading products', err);
        return throwError(() => err);
      }),
    );
  }

  //Para poder buscar
  filterLocal(category?: number | null, search?: string) {
    let filtered = [...this.allProducts()];

    // categoría
    if (category && category !== 0) {
      filtered = filtered.filter((p) => p.category?.id == category);
    }

    // búsqueda
    if (search && search.trim() !== '') {
      const term = search.toLowerCase();

      filtered = filtered.filter((p) => p.name.toLowerCase().includes(term));
    }

    this.products.set(filtered);
  }

  loadCategories() {
    return from(this.db.getAll('categories')).pipe(
      switchMap((cached) => {
        if (cached.length > 0) {
          console.log('Cargando categorías desde IndexedDB');
          this.categories.set(cached);
          return of(cached);
        }

        console.log('Cargando categorías desde API');

        return this.http.get<{ data: Category[] }>(`${this.apiUrl}/categories`).pipe(
          map((resp) => resp.data),

          tap(async (cats) => {
            this.categories.set(cats);

            try {
              await this.db.clear('categories');
              await this.db.saveAll('categories', cats);
            } catch (e) {
              console.error('Error guardando categorías', e);
            }
          }),
        );
      }),
      catchError((err) => {
        console.error('Error al cargar categorías', err);
        return throwError(() => err);
      }),
    );
  }
}
