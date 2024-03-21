import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'toIsoString',
  standalone: true
})
export class ToIsoStringPipe implements PipeTransform {

  // transform(value: any | undefined): string {
  //   // console.log('toisostring pipe value:', value);
  //   if(value === null || value === undefined){
  //     return '';
  //   }
  //   return new Date(value?.seconds * 1000).toISOString();
  // }

  transform(value: any | undefined): string {
    if(value === null || value === undefined){
      return '';
    }
    
    let date: Date;
    if (typeof value === 'number') {
      // If value is a number, assume it's a Unix timestamp
      date = new Date(value * 1000);
    } else if (value instanceof Date) {
      // If value is a Date, use it directly
      date = value;
    } else if (value.seconds) {
      // If value has a seconds property, assume it's a Firebase timestamp
      date = new Date(value.seconds * 1000);
    } else {
      console.error('Invalid date:', value);
      return '';
    }

    return date.toISOString();
  }

}
