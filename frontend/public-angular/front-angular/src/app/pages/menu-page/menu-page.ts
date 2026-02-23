import { Product } from './../../interfaces/product.interface';
import { Component, computed, input, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
const products: Product[] =  [
  { id: 1, name: 'Ramen', price: 14.50 , allergens: ['P', 'A', 'L']},
  { id: 1, name: 'Niguiri', price: 3.50 , allergens: ['P', 'O', 'L']},
  { id: 1, name: 'Fideos', price: 17.00 , allergens: ['T', 'A', 'R']},
];

@Component({
  selector: 'app-menu-page',
  imports: [ ProductCard],
  templateUrl: './menu-page.html',
})
export class MenuPage {
  product = computed(()=> products);
}
