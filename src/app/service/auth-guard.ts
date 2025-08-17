import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from './jwt-service';

export const authGuard: CanActivateFn = () => {
  const jwt = inject(JwtService);
  const router = inject(Router);

  if (jwt.isLoggedIn()) return true;

  router.navigateByUrl('/login');
  return false;
};
