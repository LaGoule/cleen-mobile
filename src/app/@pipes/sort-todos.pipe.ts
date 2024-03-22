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
        return value.sort((a, b) => {
          if (!a.color && !b.color) {
            return 0;
          }
          if (!a.color) {
            return 1;
          }
          if (!b.color) {
            return -1;
          }
          return a.color.localeCompare(b.color);
        });
      case 'priority':
        return value.sort((a, b) => b.priority - a.priority);
      case 'mostPoints':
        return value.sort((a, b) => b.points - a.points);
      case 'leastPoints':
        return value.sort((a, b) => a.points - b.points);
      default:
        return value;
    }
  }
}
