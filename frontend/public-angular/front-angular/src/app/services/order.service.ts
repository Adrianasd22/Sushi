import { computed, Injectable, signal } from '@angular/core';
import { OrderItem } from '../interfaces/order.interface';
import { IndexedDbService } from './index-db.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private storeName = 'order';
  items = signal<OrderItem[]>([]);
  totalItems = computed(() => this.items().reduce((acc, i) => acc + i.quantity, 0));

  constructor(private db: IndexedDbService) {}

  async loadItems() {
    const data = await this.db.getAll(this.storeName);
    this.items.set(data);
  }

  async addProduct(product: Product) {
    const items = this.items();

    const existing = items.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity += 1;
      await this.db.putOne(this.storeName, existing);
    } else {
      const orderItem: OrderItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      console.log("Añado producto a la cesta: ", orderItem);
      
      await this.db.putOne(this.storeName, orderItem);
    }

    const updated = await this.db.getAll(this.storeName);
    this.items.set(updated);
  }

  getAllItems(): Promise<OrderItem[]> {
    return this.db.getAll(this.storeName);
  }

  async removeProduct(id: number) {
    await this.db.deleteOne(this.storeName, id);
    const updated = await this.db.getAll(this.storeName);
    this.items.set(updated);
  }

  async clearOrder() {
    await this.db.clear(this.storeName);
    this.items.set([]);
  }
}
