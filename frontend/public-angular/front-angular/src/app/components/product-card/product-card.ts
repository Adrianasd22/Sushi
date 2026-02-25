import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();


  // allergenColors: Record<string, string> = {
  //   GLUTEN: '#E8C547',
  //   CRUSTACEOS: '#D95D39',
  //   HUEVOS: '#F4A261',
  //   PESCADO: '#457B9D',
  // };
}
