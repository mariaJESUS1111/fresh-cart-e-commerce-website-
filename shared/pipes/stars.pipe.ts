import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true
})
export class StarsPipe implements PipeTransform {
  transform(value: number): string {
    let full = '★'.repeat(Math.floor(value));
    let empty = '☆'.repeat(5 - Math.floor(value));
    return full + empty;
  }
}
