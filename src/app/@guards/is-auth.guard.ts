import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../@services/authentication.service';

export const isAuthGuard: CanActivateFn = (route, state) => {

  const _authService = inject(AuthenticationService);
  const _router = inject(Router);

  if (!_authService.activeUser) {
    console.log('Guard: User not authenticated, redirecting to login page.');
    _router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
