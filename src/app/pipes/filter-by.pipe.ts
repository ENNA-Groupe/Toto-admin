import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value: any[], column: string, arg: number): any {
    if (!value) return [];
    if (!arg) return value;
    if (!column) return value;
    return value.filter(
      item => {
        return item[column]===arg;
      }
    );

  }
}
