import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Store,
  Bike,
  BadgeEuro
} from 'lucide-angular';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-register-page',
    imports: [FormsModule, RouterLink, LucideAngularModule],
    templateUrl: './register-page.html',
    styleUrl: './register-page.scss',
})
export class RegisterPage {
    readonly Store = Store;
readonly Bike = Bike;
readonly BadgeEuro = BadgeEuro;

    nombre = signal('');
    email = signal('');
    password = signal('');

    constructor (private http: HttpClient){}

    onRegister() {
        
        const data = {
            name: this.nombre(),
            email: this.email(),
            password: this.password()
        };

        console.log('Datos a enviar:', data);

        this.http.post(`${environment.apiUrl}/register`, data, {headers: {'Content-Type': 'application/json'}})     //Cambiar localhost por la url que sea de la API cuando este desplegada
        .subscribe({
            next: (res) => {
                console.log('Registro exitoso:', res);
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                // Redireccionar a la página de login después del registro exitoso
                window.location.href = `${environment.redirectRegister}`;
            },
            error: (err) => {
                console.error('Error en el registro:', err);
            }
        })

    }
}
