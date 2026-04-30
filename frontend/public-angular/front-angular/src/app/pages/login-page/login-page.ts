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

  email    = signal('');
  password = signal('');

  constructor(private http: HttpClient) {}

  onLogin() {
    
    const data = {
      email: this.email(),
      password: this.password()
    };


    //Cambiar el localhost por la direccion de la api cuando este desplegado en AWS
    this.http.post("http://localhost:8080/api/login", data, {headers: {'Content-Type': 'application/json'}}).subscribe({     //El header no es necesario hasta donde entiendo pero queda bonito
      next: (res) => {
        console.log('Usuario autenticado:', res);
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
      }
    });

  }
}
