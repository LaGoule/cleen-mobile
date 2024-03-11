import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {

  // This is a placeholder for a real authentication guard
  // This is where you would check if the user is authenticated
  // and return true or false based on that check

  // console.log('authenticationGuard', route, state);
  return true;
};
