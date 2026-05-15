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
  
  redirect: (url: string) => void = (url: string) => { window.location.href = url; };

  onLogin() {

    const credentials = {
      email: this.email(),
      password: this.password()
    };

    this.loginService.login(credentials).subscribe({
      next: (response) => {
      // Si el login es de admin, al dashboard
      // Si el login es de usuario, al menu
      if (response.user.role == 'admin') 
      {
        alert('Bienvenido administrador ' + response.user.name + '. Redirigiendo al dashboard...');
        const token = response.access_token;
        const role = response.user.role;
        this.redirect(`http://localhost:5173?token=${token}&role=${role}`);
      } else
      {
        alert('Bienvenido de vuelta, ' + response.user.name);
        this.redirect("http://localhost:4200/menu");
      }
      
      },
      error: (err) => {
        console.error('Error de login', err);
        alert('Error de login: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  } 
}