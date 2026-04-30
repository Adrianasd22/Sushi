import { Product } from './../../interfaces/product.interface';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { CategorySection } from '../../components/category-section/category-section';
import { PageHero } from '../../components/shared/page-hero/page-hero';
import { Category } from '../../interfaces/category.interface';
// const Products: Product[] =  [
//   { id: 1, name: 'Ramen', description: 'Tomate un rico ramen', price: 14.50 , category: 'Ramen', image: '/products/ramen.png'},
//   { id: 2, name: 'Niguiri', description: 'Tomate un rico ramen', price: 3.50 , category: 'Ramen', image: '/products/ramen.png'},
//   { id: 3, name: 'Fideos', description: 'Tomate un rico ramen', price: 17.00 , category: 'Ramen', image: '/products/ramen.png'},
// ];

@Component({
  selector: 'app-menu-page',
  imports: [CategorySection, PageHero],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  productService = inject(ProductService);

  // 🔹 Mock categorías (luego vendrán del backend)
  categories = signal<Category[]>([
    { id: 1, name: 'Todos' },
    { id: 2, name: 'Sushi' },
    { id: 3, name: 'Ramen' },
    { id: 4, name: 'Entrantes' },
    { id: 5, name: 'Postres' },
  ]);

  // Señal local que refleja los productos
  products = this.productService.products;
  searchTerm = signal('');
  selectedCategory = signal<number>(1);

  //Carga de datos
  loading = signal(true);
  error = signal(false);

  constructor() {
    // Cargar productos al iniciar
    this.loading.set(true);

    this.productService.loadProducts().subscribe({
      next: () => {
        this.loading.set(false);
        this.error.set(false);
      },
      error: (err) => {
        console.log('Error: ', err);
        this.loading.set(false);
        this.error.set(true);
      }
    });

    effect(() => {
      console.log('Productos actuales:', this.products());
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
