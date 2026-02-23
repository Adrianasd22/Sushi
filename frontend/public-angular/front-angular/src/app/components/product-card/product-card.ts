import { ChangeDetectionStrategy, Component, input } from '@angular/core';



@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  id = input.required<number>();
  name = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  allergens = input.required<string[]>(); //Es Allergen pero ahora esta string

  allergenColors: Record<string, string> = {
  GLUTEN: '#E8C547',
  CRUSTACEOS: '#D95D39',
  HUEVOS: '#F4A261',
  PESCADO: '#457B9D',
};
}
