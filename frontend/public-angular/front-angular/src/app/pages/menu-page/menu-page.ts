import { Product } from './../../interfaces/product.interface';
import { Component, computed, input, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
const Products: Product[] =  [
  { id: 1, name: 'Ramen', description: 'Tomate un rico ramen', price: 14.50 , allergens: ['P', 'A', 'L']},
  { id: 1, name: 'Niguiri', description: 'Tomate un rico ramen', price: 3.50 , allergens: ['P', 'O', 'L']},
  { id: 1, name: 'Fideos', description: 'Tomate un rico ramen', price: 17.00 , allergens: ['T', 'A', 'R']},
];

@Component({
  selector: 'app-menu-page',
  imports: [ ProductCard],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  products = computed(()=> Products);

}
