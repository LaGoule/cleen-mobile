import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GroupService } from '../@services/group.service';

export const isInGroupGuard: CanActivateFn = (route, state) => {

  const _groupService = inject(GroupService);
  const _router = inject(Router);

  if (!_groupService.activeGroup || _groupService.activeGroup === '') {
    console.log('Guard: User not in a group, redirecting to ...');
    _router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
