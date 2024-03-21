import { Pipe, PipeTransform } from '@angular/core';
import { iTodo } from '../@interfaces/interfaces';

@Pipe({
  name: 'sortTodos',
  standalone: true
})
export class SortTodosPipe implements PipeTransform {

  transform(value: iTodo[], sortingType: string): iTodo[] {
    switch (sortingType) {
      case 'alphabetical':
        return value.sort((a, b) => a.title.localeCompare(b.title));
      case 'mostUrgent':
        return value.sort((a, b) => {
          if (a.dueDate && !b.dueDate) {
            return -1;
          }
          if (!a.dueDate && b.dueDate) {
            return 1;
          }
          if (a.dueDate && b.dueDate) {
            return (a.dueDate as any).toDate().getTime() - (b.dueDate as any).toDate().getTime();
          }
          return 0;
        });
      case 'leastUrgent':
        return value.sort((a, b) => {
          if (a.dueDate && !b.dueDate) {
            return 1;
          }
          if (!a.dueDate && b.dueDate) {
            return -1;
          }
          if (a.dueDate && b.dueDate) {
            return (b.dueDate as any).toDate().getTime() - (a.dueDate as any).toDate().getTime();
          }
          return 0;
        });
      case 'color':
        return value.sort((a, b) => a.color.localeCompare(b.color));
      default:
        return value;
    }
  }
}
