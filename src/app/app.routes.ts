import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { authGuard } from './service/auth-guard';
import { PlaylistsHubComponent } from './components/playlists-hub/playlists-hub';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lists', component: PlaylistsHubComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'lists' },
  { path: '**', redirectTo: 'lists' }
];