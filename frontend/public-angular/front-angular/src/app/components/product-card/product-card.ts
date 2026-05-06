import { OrderService } from './../../services/order.service';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
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
  orderService= inject(OrderService);

  imageError = signal(false);

  addToOrder(){    
    this.orderService.addProduct(this.product());
  }
  onImageError() {
    this.imageError.set(true);
  }
}
