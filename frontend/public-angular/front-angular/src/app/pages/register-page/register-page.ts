import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register-page',
    imports: [FormsModule, RouterLink],
    templateUrl: './register-page.html',
    styleUrl: './register-page.scss',
})
export class RegisterPage {

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

        this.http.post('http://localhost:8080/api/register', data, {headers: {'Content-Type': 'application/json'}})     //Cambiar localhost por la url que sea de la API cuando este desplegada
        .subscribe({
            next: (res) => {
                console.log('Registro exitoso:', res);
            },
            error: (err) => {
                console.error('Error en el registro:', err);
            }
        })

    }
}
