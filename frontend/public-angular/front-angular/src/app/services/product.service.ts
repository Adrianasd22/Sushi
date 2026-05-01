import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { catchError, map, tap, throwError } from 'rxjs';
import { Category, CategoryWithProducts } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api';
  private baseUrl = 'http://localhost:8080/storage/';

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  categoriesWithProducts = signal<CategoryWithProducts[]>([]);

  private http = inject(HttpClient);

  loadCategoriesWithProducts() {
    return this.http
      .get<{ data: CategoryWithProducts[] }>(`${this.apiUrl}/categories-with-products`)
      .pipe(
        map((resp) =>
          resp.data.map((cat) => ({
            ...cat,

            // 🔥 Transformamos productos dentro de cada categoría
            products: cat.products.map((prod) => ({
              ...prod,
              image: `${this.baseUrl}${prod.image}`,
            })),
          })),
        ),

        tap((categories) => {
          this.categoriesWithProducts.set(categories);
          this.products.set([]); // limpiamos productos sueltos
        }),

        catchError((err) => {
          console.error('Error al cargar categorías', err);
          return throwError(() => err);
        }),
      );
  }

  loadFilteredProducts(category?: number | null, search?: string) {
    let params = new HttpParams();

    if (category != null && category !== 0) {
      // asumimos 0 = "Todos", no se envia category_id
      params = params.set('category_id', category);
    }

    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<{ data: Product[] }>(`${this.apiUrl}/products`, { params })
      .pipe(

        map(resp => resp.data.map(prod => ({
          ...prod,
          image: `${this.baseUrl}${prod.image}`
        }))),

        tap(products => {
          this.products.set(products);
          this.categoriesWithProducts.set([]); // limpiamos categorías
        }),

        catchError(err => {
          console.error('Error al filtrar productos', err);
          return throwError(() => err);
        })
      );
  }

  loadCategories() {
    return this.http
        .get<{ data: Category[] }>('http://localhost:8080/api/categories')
        .pipe(
        map(resp => resp.data),
        tap(cats => this.categories.set(cats)),
        catchError(err => {
            console.error('Error al cargar categorías', err);
            return throwError(() => err);
        })
        );
    }
}
