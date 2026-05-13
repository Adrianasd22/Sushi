import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';
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
  private http = inject(HttpClient);

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
    //postalCode: ['', [Validators.pattern(/^\d{5}$/)]],
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

    if(this.items().length === 0)
    {
      alert("Pedido sin productos. Por favor, introduzca algun producto en la cesta antes de hacer su pedido.");
      return;
    }

    const payload = {
      mode: this.mode(),
      products: this.items(),
      total: this.total(),
      ...this.form.value,
    };

    const token = localStorage.getItem('auth_token');

    this.http.post('http://localhost:8080/api/orders', payload, {
      headers: 
      {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}})
    .subscribe({
      next: (res) => {
        // Desarrollo
        console.log("Pedido ingresado correctamente en la BBDD");
        alert("Pedido creado correctamente. Gracias por su confianza.");
        window.location.href = "http://localhost:4200";
      },
      error: (err) => {
        console.log("Error guardando los datos. Intentalo de nuevo: ", err);
      }
    })

  }

  // Helper para el HTML
  isInvalid(field: string) {
    const control = this.form.get(field);
    return control?.invalid && control?.touched;
  }
}