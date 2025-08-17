import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaReproduccion } from '../models/playlist.models';

@Injectable({ providedIn: 'root' })
export class PlaylistsService {
  // si tienes environments, cambia por environment.apiUrl
  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ListaReproduccion[]> {
    return this.http.get<ListaReproduccion[]>(`${this.api}/lists`);
  }

  getByName(name: string): Observable<ListaReproduccion> {
    return this.http.get<ListaReproduccion>(`${this.api}/lists/${encodeURIComponent(name)}`);
  }

  createList(body: ListaReproduccion): Observable<ListaReproduccion> {
    return this.http.post<ListaReproduccion>(`${this.api}/lists`, body);
  }

  deleteByName(name: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/lists/${encodeURIComponent(name)}`);
  }
}
