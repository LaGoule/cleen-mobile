import { Pipe, PipeTransform } from '@angular/core';
import { iTodo, iUser } from '../@interfaces/interfaces';

@Pipe({
  name: 'filterByUser',
  standalone: true
})
export class FilterByUserPipe implements PipeTransform {

  transform(value: iTodo[], userId: string): iTodo[] {
    if (userId === null || userId === undefined) {
      return value;
    } else {
      // return todos where completedBy[] contains userId
      return value.filter(todo => todo.completedBy?.includes(userId));
    }
  }

}
