import { Pipe, PipeTransform } from '@angular/core';
import { iUser } from '../@interfaces/interfaces';

@Pipe({
  name: 'sortMembers',
  standalone: true
})
export class SortMembersPipe implements PipeTransform {

  transform(value: iUser[]): iUser[] {
    // Sort members by points
    value.sort((a, b) => {
      if (a.points < b.points) {
        return 1;
      }
      if (a.points > b.points) {
        return -1;
      }
      return 0;
    });
    return value;
  }

}
