import { Pipe, PipeTransform } from '@angular/core';
import { iUser } from '../@interfaces/interfaces';

@Pipe({
  name: 'usersToUid',
  standalone: true
})
export class UsersToUidPipe implements PipeTransform {

  transform(value: iUser[]): string[] {
    return value.map((user: iUser) => user.uid);
  }
}
