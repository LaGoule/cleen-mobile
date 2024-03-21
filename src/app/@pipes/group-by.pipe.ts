import { Pipe, PipeTransform } from '@angular/core';
import { iTodo } from '../@interfaces/interfaces';

@Pipe({
  name: 'groupBy',
  standalone: true
})
export class GroupByPipe implements PipeTransform {

  transform(value: iTodo[]): iTodo[] {
    return value;
  }

}
