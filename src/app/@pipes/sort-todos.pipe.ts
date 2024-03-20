import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTodos',
  standalone: true
})
export class SortTodosPipe implements PipeTransform {

  transform(value: any): any {
    // Sort the todos by date
    // value.sort((a: any, b: any) => {
    //   return a.dueDate - b.dueDate;
    // });
    return value;
  }
  
}
