import { Component } from '@angular/core';
import { AuthService, Usuario } from '../../service/auth';
import { JwtService } from '../../service/jwt-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private jwt: JwtService,
    private router: Router
  ) {}

  ingresar(): void {
    const user: Usuario = { email: this.email, password: this.password };
    this.authService.login(user).subscribe({
      next: (res) => {
        this.jwt.setToken(res.token);       
        this.message = '¡Bienvenido! ✅';
        this.router.navigateByUrl('/lists');
      },
      error: (err) => {
        this.message = `Error: ${err.error?.error || 'Credenciales inválidas'}`;
      }
    });
  }

  cerrarSesion(): void {
    this.jwt.removeToken();
    this.message = 'Sesión cerrada';
  }
}
