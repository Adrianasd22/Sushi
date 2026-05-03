import { OrderService } from './../../services/order.service';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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

  addToOrder(){    
    this.orderService.addProduct(this.product());
  }
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'http://localhost:8080/storage/NoImage.png';
  }
}
