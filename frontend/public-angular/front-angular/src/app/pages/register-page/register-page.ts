import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-page',
    imports: [FormsModule, RouterLink],
    templateUrl: './register-page.html',
    styleUrl: './register-page.scss',
})
export class RegisterPage {

    nombre = signal('');
    email = signal('');
    password = signal('');

    onRegister() {
        // TODO: conectar con AuthService cuando esté implementado en el backend
        //¿Se puede hacer esto en php o JS más facilmente?
        console.log('Info registro:', this.nombre(), this.email(), this.password());
    }
}
