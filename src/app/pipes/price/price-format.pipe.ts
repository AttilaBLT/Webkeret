import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '';
    }

    const num = Number(value);
    const formatted = num.toLocaleString('hu-HU');
    return `${formatted} Ft`;
  }

}
