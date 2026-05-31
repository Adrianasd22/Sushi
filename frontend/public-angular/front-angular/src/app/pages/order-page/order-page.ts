import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../../interfaces/order.interface';
import { environment } from '../../../environments/environment';

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

  //Variable para controlar la disponibilidad del boton
  isLoading = false;

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
    this.resetValidators();

  }

  setMode(mode: 'pickup' | 'delivery') {
    this.mode.set(mode);
    this.resetValidators();
  }

  private resetValidators() {
    const address = this.form.controls.address;
    address.clearValidators();

    if (this.mode() === 'delivery') {
      address.setValidators([Validators.required]);
    }

    // Reaplica
    address.updateValueAndValidity();
  }

  submitOrder() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.isLoading = true;

    if(this.items().length === 0)
    {
      alert("Pedido sin productos. Por favor, introduzca algun producto en la cesta antes de hacer su pedido.");
      this.isLoading = false;
      return;
    }

    const payload = {
      mode: this.mode(),
      products: this.items(),
      address: this.form.value.address,
      notes: this.form.value.note,
      total: this.total(),
      ...this.form.value,
    };

    

    const token = localStorage.getItem('auth_token');

    this.http.post(`${environment.apiUrl}/orders`, payload, {
      headers: 
      {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}})
    .subscribe({
      next: (res) => {
        this.orderService.clearOrder().then(() => {
          alert("Pedido creado correctamente. Gracias por su confianza.");
          window.location.href = `${environment.defaultAngular}`;
        });
      },
      error: (err) => {
        console.log("Error guardando los datos. Intentalo de nuevo: ", err);
        alert("Error guardando los datos. Intentalo de nuevo.");
        this.isLoading = false;
      }
    })

  }

  // Helper para el HTML
  isInvalid(field: string) {
    const control = this.form.get(field);
    return control?.invalid && control?.touched;
  }
}