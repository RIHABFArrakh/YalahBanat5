import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['expectedRole'];
  const actualRole = localStorage.getItem('role');
  return expectedRole === actualRole;
};
