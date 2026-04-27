import { Product } from './../../interfaces/product.interface';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { ProductService } from '../../services/product.service';
import { CategorySection } from "../../components/category-section/category-section";
// const Products: Product[] =  [
//   { id: 1, name: 'Ramen', description: 'Tomate un rico ramen', price: 14.50 , category: 'Ramen', image: '/products/ramen.png'},
//   { id: 2, name: 'Niguiri', description: 'Tomate un rico ramen', price: 3.50 , category: 'Ramen', image: '/products/ramen.png'},
//   { id: 3, name: 'Fideos', description: 'Tomate un rico ramen', price: 17.00 , category: 'Ramen', image: '/products/ramen.png'},
// ];

@Component({
  selector: 'app-menu-page',
  imports: [ CategorySection],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  // products = computed(()=> Products);

  productService = inject(ProductService);

  // Señal local que refleja los productos
  products = this.productService.products;
  searchTerm = signal('');
  selectedCategory = signal<string | null>(null);

  constructor() {
    // Cargar productos al iniciar
    this.productService.loadProducts().subscribe({
      error: err => console.log('Error: ', err)
    });
    effect(() => {
      console.log('Productos actuales:', this.products());
    });
  }




//   // Crea una lista con los prod por nombre y otro con la categoria y luego devuelve los que coincidan con ambos
//   filteredProducts = computed(() => {
//     return this.products().filter(product => {
//       const matchesName =
//         product.name.toLowerCase()
//           .includes(this.searchTerm().toLowerCase());

//       const matchesCategory =
//         !this.selectedCategory() ||
//         product.category.name === this.selectedCategory();

//       return matchesName && matchesCategory;
//     });
//   });

//   // Crea un record con la categoria como clave y un array de productos como valor
//   groupedProducts = computed(() => {

//   const grouped: Record<string, Product[]> = {};

//   for (const product of this.filteredProducts()) {
//     const category = product.category.name;

//     if (!grouped[category]) {
//       grouped[category] = [];
//     }
//     grouped[category].push(product);
//   }
//   return Object.entries(grouped).map(([name, products]) => ({
//     name,
//     products
//   }));

// });

}
