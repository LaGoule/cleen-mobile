import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../@services/authentication.service';
import { firstValueFrom } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const _authService = inject(AuthenticationService);
  const _router = inject(Router);

  if (!_authService.loggedUser) {
    _router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
