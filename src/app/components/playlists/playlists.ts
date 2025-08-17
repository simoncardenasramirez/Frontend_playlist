import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlaylistService } from '../../service/play-list-service';
import { ListaReproduccion } from '../../models/playlist.models';
import { JwtService } from '../../service/jwt-service';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './playlists.html',
  styleUrl: './playlists.scss'
})export class PlaylistsComponent implements OnInit {
  listas: ListaReproduccion[] = [];
  cargando = false;
  mensaje = '';

  // formulario crear
  nombre = '';
  descripcion = '';

  constructor(
    private playlists: PlaylistService,
    private jwt: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarListas();
  }

  logout(): void {
    this.jwt.removeToken();    
    this.router.navigateByUrl('/login');
  }

  cargarListas(): void {
    this.cargando = true;
    this.mensaje = '';
    this.playlists.getAll().subscribe({
      next: data => { this.listas = data ?? []; },
      error: err => { this.mensaje = err.error?.error || 'No se pudieron cargar las listas'; },
      complete: () => this.cargando = false
    });
  }

  crear(): void {
    if (!this.nombre.trim()) {
      this.mensaje = 'El nombre es obligatorio';
      return;
    }
    const body: ListaReproduccion = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion?.trim()
    };
    this.mensaje = 'Creando...';
    this.playlists.create(body).subscribe({
      next: () => {
        this.mensaje = 'Lista creada ✅';
        this.nombre = '';
        this.descripcion = '';
        this.cargarListas();
      },
      error: err => {
        this.mensaje = err.error?.error || 'No se pudo crear la lista';
      }
    });
  }

  eliminar(nombre: string): void {
    if (!confirm(`¿Eliminar la lista "${nombre}"?`)) return;
    this.mensaje = 'Eliminando...';
    this.playlists.remove(nombre).subscribe({
      next: () => {
        this.mensaje = 'Lista eliminada ✅';
        this.cargarListas();
      },
      error: err => {
        this.mensaje = err.error?.error || 'No se pudo eliminar';
      }
    });
  }
}