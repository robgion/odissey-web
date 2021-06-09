import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: number): unknown {
     return value === 1 ? 'Attivo' : 'Non attivo';;
  }

}
