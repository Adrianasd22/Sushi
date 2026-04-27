import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  email    = signal('');
  password = signal('');

  onLogin() {
    // TODO: conectar con AuthService cuando esté implementado en el backend
    //¿Se puede hacer esto en php o JS más facilmente?
    console.log('Login:', this.email(), this.password());
  }
}
