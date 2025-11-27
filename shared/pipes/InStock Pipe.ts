


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inStock',
  standalone: true
})
export class InStockPipe implements PipeTransform {
  transform(quantity: number): string {
    if (quantity > 10) return "In Stock";
    if (quantity > 0) return `Only ${quantity} left!`;
    return "Out of Stock";
  }
}
