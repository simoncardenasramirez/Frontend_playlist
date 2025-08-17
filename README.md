

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
🧪 Pruebas
bash
Copiar
Editar
npm run test
👤 Credenciales de ejemplo
Usuario: demo@correo.com

Password: Secreta123

yaml
Copiar
Editar

---

# 4) ¿Cómo exportar la colección de **Postman**?

1. Abre Postman → **Collections** → tu colección.
2. Click en `...` → **Export** → formato `2.1`.
3. Guarda el archivo como `playlist-api.postman_collection.json`.
4. Súbelo al repo backend en la carpeta `postman/`.

*(Opcional)*: comparte link público: **Share → Get public link** y colócalo en el README.

---

# 5) Push a GitHub (por si te sirve el recordatorio)

```bash
# Backend
git add .
git commit -m "docs: README + postman collection"
git push origin main

# Frontend
git add .
git commit -m "docs: README"
git push origin main
6) Texto de correo listo para enviar
yaml
Copiar
Editar
Asunto: Entrega prueba técnica – Backend + Frontend + Postman

Hola, buenas tardes.

Comparto la solución de la prueba técnica:

- Backend (Spring Boot + JPA + H2 + JWT)
  Repo: https://github.com/<usuario>/playlist-backend

- Frontend (Angular)
  Repo: https://github.com/<usuario>/playlist-frontend

- Colección Postman
  Archivo JSON en el repo backend: /postman/playlist-api.postman_collection.json
  Link público (opcional): https://api.postman.com/collections/XXXXXXXX (si lo generas)

Credenciales de prueba
- Usuario: demo@correo.com
- Password: Secreta123

Prerrequisitos
- Backend: Java 21 y Maven 3.9+
- Frontend: Node 20/22, NPM 10, Angular CLI

Quedo atento. 
¡Gracias!
