import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'toIsoString',
  standalone: true
})
export class ToIsoStringPipe implements PipeTransform {

  transform(value: any | undefined): string {
    console.log('toisostring pipe value:', value);
    if(value === null || value === undefined){
      return '';
    }
    return new Date(value?.seconds * 1000).toISOString();
  }

}
