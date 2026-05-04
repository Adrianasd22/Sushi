import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  apiUrl = 'http://localhost:8080/api/login';
  email = signal('');
  password = signal('');

  constructor(private loginService: LoginService) { }

  onLogin() {

    const credentials = {
      email: this.email(),
      password: this.password()
    };

    this.loginService.login(credentials).subscribe({
      next: (response) => {

      // Redireccionar a la página de inicio después del login exitoso
      window.location.href = 'http://localhost:5173';

      },
      error: (err) => {
        console.error('Error de login', err);
        alert('Error de login: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  } 
}