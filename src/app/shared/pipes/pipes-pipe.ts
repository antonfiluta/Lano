import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLength',
})
export class TextLengthPipe implements PipeTransform {
  transform(value: string, length: number): string {
    if (value.length > length) {
      return `${value.slice(0, length)}...`;
    }
    return value;
  }
}
