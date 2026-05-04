import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
  imports: [ReactiveFormsModule],
})
export class OrderPage implements OnInit {
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);

  items = this.orderService.items;
  mode = signal<'pickup' | 'delivery'>('pickup');

  total = computed(() =>
    this.items().reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // Campos compartidos siempre presentes
  form = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    note: [''],

    // Pickup
    bellNumber: [''],

    // Delivery
    address: [''],
    city: [''],
    postalCode: ['', [Validators.pattern(/^\d{5}$/)]],
  });

  async ngOnInit() {
    await this.orderService.loadItems();
  }

  setMode(mode: 'pickup' | 'delivery') {
    this.mode.set(mode);
    this.resetValidators();
  }

  private resetValidators() {
    const { bellNumber, address} = this.form.controls;

    // Limpia todos primero
    [bellNumber, address].forEach(c => {
      c.clearValidators();
      c.updateValueAndValidity();
    });

    if (this.mode() === 'pickup') {
      bellNumber.setValidators([Validators.required]);
    } else {
      address.setValidators([Validators.required]);
    }

    // Reaplica
    [bellNumber, address].forEach(c => c.updateValueAndValidity());
  }

  submitOrder() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const payload = {
      mode: this.mode(),
      items: this.items(),
      total: this.total(),
      ...this.form.value,
    };

    console.log('Pedido listo para enviar:', payload);
    // this.http.post(...)
  }

  // Helper para el HTML
  isInvalid(field: string) {
    const control = this.form.get(field);
    return control?.invalid && control?.touched;
  }
}