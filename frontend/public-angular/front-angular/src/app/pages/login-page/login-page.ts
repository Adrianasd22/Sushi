import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  email = signal('');
  password = signal('');

  constructor(private http: HttpClient) { }

  onLogin() {

    const data = {
      email: this.email(),
      password: this.password(),
    };

    this.http.post('http://localhost:8080/api/login', data).subscribe({
      next: (response: any) => {
        console.log("Respuesta del servidor:", response.mensaje)
        localStorage.setItem('auth_token', response.access_token);

      //Aqui se añade la redireccion del usuario

      },
      error: (error) => {
        console.error("Error del login: ", error);
        alert(error.error.mensaje || 'Error al iniciar sesion');
      }
    });

  } 
}