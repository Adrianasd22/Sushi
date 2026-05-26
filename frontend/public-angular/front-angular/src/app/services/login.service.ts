import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.loginUrl;

  constructor(private http: HttpClient) { }

  // El servicio recibe los datos y devuelve la respuesta
  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        // Guardamos el token automáticamente cuando la petición es exitosa
        if (response.access_token) {
          localStorage.setItem('auth_token', response.access_token);
          localStorage.setItem('role', response.user.role);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
  }
}