import { Pipe, PipeTransform } from '@angular/core';
import { iTodo } from '../@interfaces/interfaces';

@Pipe({
  name: 'sortTodos',
  standalone: true
})
export class SortTodosPipe implements PipeTransform {

  transform(value: iTodo[], sortingType: string): iTodo[] {
    // Alphabetical
    if (sortingType === 'alphabetical') {
      return value.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    // Date
    if (sortingType === 'dueDate') {
      const future = new Date(
        new Date().getFullYear() + 100,
        new Date().getMonth(),
        new Date().getDate(),
      ).getTime();
      
      return value.sort((a, b) => {
        return (a.dueDate?.getTime()||future) - (b.dueDate?.getTime()||future);
      });
    }
    // Color
    if (sortingType === 'color') {
      return value.sort((a, b) => {
        return a.color.localeCompare(b.color);
      });
    }
    return value;
  }
}
