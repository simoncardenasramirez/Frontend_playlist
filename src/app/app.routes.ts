import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { PlaylistsComponent } from './components/playlists/playlists';

export const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lists', component: PlaylistsComponent },
  // { path: 'lists/:name', loadComponent: () => import('./components/playlist-detail/playlist-detail.component').then(m => m.PlaylistDetailComponent) },
  { path: '**', redirectTo: 'lists' }];