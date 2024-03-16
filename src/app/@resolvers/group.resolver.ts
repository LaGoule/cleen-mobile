import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GroupService } from '../@services/group.service';

export const groupResolver: ResolveFn<boolean> = (route, state) => {
  const groupService = inject(GroupService);
  console.log('Group Resolver: ', groupService.activeGroup);

  return groupService.activeGroup !== '' ? true : false;
};