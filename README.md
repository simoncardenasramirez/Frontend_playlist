

```markdown
# Playlist Web (Angular)

Frontend en Angular para autenticarse (JWT) y gestionar **listas de reproducción**:
- Listar todas
- Crear (con canciones embebidas)
- Ver detalle
- Eliminar
- Cerrar sesión

## 🚀 Tecnologías
- Angular 16/17/20 (CLI)
- TypeScript
- CSS/SCSS
- HttpClient

## 🔗 API base
Configurable en `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};

🧰 Requisitos
Node 18+ (mejor 20/22)

NPM 9/10

Angular CLI instalado global:

bash
Copiar
Editar
npm i -g @angular/cli

▶️ Ejecutar
bash
Copiar
Editar
npm install
npm start
# abre http://localhost:4200

🔐 Autenticación
Primero Login con usuario/clave (o Register si no existe).

El token JWT se guarda en cookie (jwt) vía JwtService.


🧭 Rutas principales (ejemplo)
/login – inicio de sesión

/register – registro de usuario

/lists – pantalla principal con listado / crear / eliminar

/lists/:name – detalle con canciones

Las rutas protegidas usan un AuthGuard que bloquea si no hay token.

🧩 Interceptor
Un HTTP Interceptor añade automáticamente el header Authorization: Bearer <token> a las peticiones hacia el backend.

🧱 Estructura (resumen)
arduino
Copiar
Editar
src/app
  ├─ components/
  │   ├─ auth/
  │   │   ├─ login/
  │   │   └─ register/
  │   ├─ playlists/              # pantalla principal (listar/crear/eliminar)
  │   └─ playlist-detail/
  ├─ service/
  │   ├─ auth.service.ts
  │   ├─ jwt.service.ts
  │   ├─ playlists.service.ts
  │   └─ auth.interceptor.ts
  ├─ guards/
  │   └─ auth.guard.ts
  ├─ models/
  │   └─ playlist.models.ts
  ├─ app.routes.ts
  └─ app.config.ts

👤 Credenciales de ejemplo
Usuario: demo@correo.com

Password: Secreta123


