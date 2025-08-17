import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private cookieName = 'jwt';

  setToken(token: string, minutes: number = 120): void {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${this.cookieName}=${encodeURIComponent(token)}; Expires=${expires}; Path=/; SameSite=Lax`;
  }

  getToken(): string | null {
    const name = this.cookieName + '=';
    const parts = document.cookie.split(';');
    for (let c of parts) {
      c = c.trim();
      if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length));
    }
    return null;
  }

  removeToken(): void {
    document.cookie = `${this.cookieName}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
