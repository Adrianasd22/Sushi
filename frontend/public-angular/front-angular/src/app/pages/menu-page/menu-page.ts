import { Product } from './../../interfaces/product.interface';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { CategorySection } from '../../components/category-section/category-section';
import { PageHero } from '../../components/shared/page-hero/page-hero';
import { Category } from '../../interfaces/category.interface';
import { TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
// const Products: Product[] =  [
//   { id: 1, name: 'Ramen', description: 'Tomate un rico ramen', price: 14.50 , category: 'Ramen', image: '/products/ramen.png'},
//   { id: 2, name: 'Niguiri', description: 'Tomate un rico ramen', price: 3.50 , category: 'Ramen', image: '/products/ramen.png'},
//   { id: 3, name: 'Fideos', description: 'Tomate un rico ramen', price: 17.00 , category: 'Ramen', image: '/products/ramen.png'},
// ];

@Component({
  selector: 'app-menu-page',
  imports: [PageHero, ProductCard, TitleCasePipe],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  productService = inject(ProductService);

  // 🔹 Mock categorías (luego vendrán del backend)
  // categories = signal<Category[]>([
  //   { id: 1, name: 'Todos' },
  //   { id: 2, name: 'Sushi' },
  //   { id: 3, name: 'Ramen' },
  //   { id: 4, name: 'Entrantes' },
  //   { id: 5, name: 'Postres' },
  // ]);

  // Señal local que refleja los productos
  products = this.productService.products;
  categories = this.productService.categories;
  categoriesWithAll = computed(() => [
    { id: 0, name: 'Todos' },
    ...this.categories()
  ]);
  categoriesWithProducts = this.productService.categoriesWithProducts;

  searchTerm = signal('');
  selectedCategory = signal<number>(1);

  //Carga de datos
  loading = signal(true);
  error = signal(false);
  isFiltering = computed(() => {
    return this.selectedCategory() !== 0 || this.searchTerm().trim().length > 0;
  });

  constructor() {
    // Cargar productos al iniciar
    this.loading.set(true);

    this.productService.loadCategories().subscribe();

    effect(() => {
      console.log('Productos actuales:', this.products());
      this.loading.set(false);
    });

    effect(() => {
      const category = this.selectedCategory();
      const search = this.searchTerm();
      
      this.loading.set(true);
      this.error.set(false);
      
      let request: Observable<any>;

      if ((category === 0 || category == null) && !search) {
        request = this.productService.loadCategoriesWithProducts();
      } else {
        request = this.productService.loadFilteredProducts(category, search);
      }

      request.subscribe({
        next: () => this.loading.set(false),
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        },
      });
    });

  }
  

  // 🔹 Acciones
  selectCategory(id: number) {
    this.selectedCategory.set(id);
  }

  updateSearch(value: string) {
    this.searchTerm.set(value);
  }
}
