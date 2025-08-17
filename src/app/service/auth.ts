import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:8080/auth'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_URL}/register`, usuario);
  }

 login(user: Usuario) {
    return this.http.post<{token: string}>(`${API_URL}/login`, user);
  }
}

