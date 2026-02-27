import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'category-section',
  imports: [ProductCard],
  templateUrl: './category-section.html',
})
export class CategorySection { 
  title = input.required<string>();
  products = input.required<Product[]>();
}
