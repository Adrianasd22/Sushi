import { Product } from './../../interfaces/product.interface';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { ProductService } from '../../services/product.service';
const Products: Product[] =  [
  { id: 1, name: 'Ramen', description: 'Tomate un rico ramen', price: 14.50 , category: 'Ramen', image: '/products/ramen.png'},
  { id: 2, name: 'Niguiri', description: 'Tomate un rico ramen', price: 3.50 , category: 'Ramen', image: '/products/ramen.png'},
  { id: 3, name: 'Fideos', description: 'Tomate un rico ramen', price: 17.00 , category: 'Ramen', image: '/products/ramen.png'},
];

@Component({
  selector: 'app-menu-page',
  imports: [ ProductCard],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  // products = computed(()=> Products);

  productService = inject(ProductService);

  // Señal local que refleja los productos
  products = this.productService.products;

  constructor() {
    // Cargar productos al iniciar
    this.productService.loadProducts().subscribe({
      error: err => console.log('Error: ', err)
    });

    effect(() => {
      console.log('Productos actuales:', this.products());
    });
  }

}
