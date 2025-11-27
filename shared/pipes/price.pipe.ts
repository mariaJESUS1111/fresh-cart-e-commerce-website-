import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egp',
  standalone: true
})
export class EgpPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('en-EG') + ' EGP';
  }
}
 