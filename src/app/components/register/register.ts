import { Component } from '@angular/core';
import { AuthService, Usuario } from '../../service/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  registrar() {
    const user: Usuario = {
      email: this.email,
      password: this.password
    };

    this.authService.registrar(user).subscribe({
      next: () => {
        this.message = ' Usuario registrado correctamente';
        this.email = '';
        this.password = '';
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.message = ` Error: ${err?.error?.message || 'No se pudo registrar'}`;
      }
    });
  }
}