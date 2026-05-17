import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';
import { LucideAngularModule, Store, Bike, BadgeEuro } from 'lucide-angular';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  readonly Store = Store;
  readonly Bike = Bike;
  readonly BadgeEuro = BadgeEuro;

  apiUrl = environment.loginUrl;
  email = signal('');
  password = signal('');

  constructor(private loginService: LoginService) {}

  redirect: (url: string) => void = (url: string) => {
    window.location.href = url;
  };

  onLogin() {
    const credentials = {
      email: this.email(),
      password: this.password(),
    };

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        // Si el login es de admin, al dashboard
        // Si el login es de usuario, al menu
        if (response.user.role == 'admin') {
          alert(
            'Bienvenido administrador ' + response.user.name + '. Redirigiendo al dashboard...',
          );
          const token = response.access_token;
          const role = response.user.role;
          this.redirect(environment.dashboardUrl + `?token=${token}&role=${role}`);
        } else {
          alert('Bienvenido de vuelta, ' + response.user.name);
          this.redirect(environment.menuUrl);
        }
      },
      error: (err) => {
        console.error('Error de login', err);
        alert('Error de login: ' + (err.error?.message || 'Error desconocido'));
      },
    });
  }
}
