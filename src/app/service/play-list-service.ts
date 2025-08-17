import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListaReproduccion } from '../models/playlist.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080'; 

  getAll(): Observable<ListaReproduccion[]> {
    return this.http.get<ListaReproduccion[]>(`${this.base}/lists`);
  }

  getOne(nombre: string): Observable<ListaReproduccion> {
    return this.http.get<ListaReproduccion>(`${this.base}/lists/${encodeURIComponent(nombre)}`);
  }

  create(payload: ListaReproduccion): Observable<ListaReproduccion> {
    return this.http.post<ListaReproduccion>(`${this.base}/lists`, payload);
  }

  remove(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/lists/${encodeURIComponent(nombre)}`);
  }
}
