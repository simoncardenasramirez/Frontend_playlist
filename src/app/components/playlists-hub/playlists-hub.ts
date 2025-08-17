import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ListaReproduccion, Cancion } from '../../models/playlist.models';
import { PlaylistsService } from '../../service/play-list-service';
import { JwtService } from '../../service/jwt-service';


@Component({
  selector: 'app-playlists-hub',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './playlists-hub.html',
  styleUrl: './playlists-hub.scss'
})

export class PlaylistsHubComponent implements OnInit {

  // LISTADO
  listas: ListaReproduccion[] = [];
  loadingList = false;
  errorList = '';

  seleccion?: ListaReproduccion;     
  loadingDetail = false;
  errorDetail = '';

  crearVisible = false;
  form!: FormGroup;
  loadingCreate = false;
  messageCreate = '';

  constructor(
    private fb: FormBuilder,
    private api: PlaylistsService,
    private jwt: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarListas();
  }

  // ====== FORM ======
  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      canciones: this.fb.array([this.buildSong()])
    });
  }

  get canciones(): FormArray {
    return this.form.get('canciones') as FormArray;
  }

  private buildSong(): FormGroup {
    return this.fb.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      album: [''],
      anno: [''],
      genero: ['']
    });
  }

  addSong(): void {
    this.canciones.push(this.buildSong());
  }

  removeSong(i: number): void {
    if (this.canciones.length > 1) {
      this.canciones.removeAt(i);
    }
  }

  toggleCrear(): void {
    this.crearVisible = !this.crearVisible;
    if (this.crearVisible) {
      this.form.reset();
      this.canciones.clear();
      this.addSong();
      this.messageCreate = '';
    }
  }

  crearLista(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      nombre: this.form.value.nombre as string,
      descripcion: this.form.value.descripcion as (string | undefined),
      canciones: (this.form.value.canciones as Cancion[]).map(c => ({
        titulo: c.titulo,
        artista: c.artista,
        album: c.album ?? '',
        anno: c.anno ?? '',
        genero: c.genero ?? ''
      }))
    } as ListaReproduccion;

    this.loadingCreate = true;
    this.api.createList(payload).subscribe({
      next: _ => {
        this.loadingCreate = false;
        this.messageCreate = 'Lista creada ✅';
        this.toggleCrear();
        this.cargarListas();
      },
      error: err => {
        this.loadingCreate = false;
        this.messageCreate = err?.error?.message || 'No se pudo crear la lista';
      }
    });
  }

  // ====== LISTADO ======
  cargarListas(): void {
    this.loadingList = true;
    this.errorList = '';
    this.api.getAll().subscribe({
      next: data => {
        this.listas = data ?? [];
        this.loadingList = false;
      },
      error: err => {
        this.loadingList = false;
        this.errorList = err?.error?.message || 'Error cargando listas';
      }
    });
  }

  // ====== DETALLE ======
  verDetalle(nombre: string): void {
    this.loadingDetail = true;
    this.errorDetail = '';
    this.seleccion = undefined;

    this.api.getByName(nombre).subscribe({
      next: det => {
        this.seleccion = det;
        this.loadingDetail = false;
      },
      error: err => {
        this.loadingDetail = false;
        this.errorDetail = err?.error?.message || 'No se pudo cargar el detalle';
      }
    });
  }

  // ====== ELIMINAR ======
  eliminar(nombre: string): void {
    if (!confirm(`¿Seguro que quieres borrar "${nombre}"?`)) return;

    this.api.deleteByName(nombre).subscribe({
      next: _ => {
        // si borraste la que estaba en detalle, límpialo
        if (this.seleccion?.nombre === nombre) this.seleccion = undefined;
        this.cargarListas();
      },
      error: err => {
        alert(err?.error?.message || 'No se pudo eliminar');
      }
    });
  }

  
  logout(): void {
    this.jwt.removeToken();
    this.router.navigate(['/login']);
  }
}
