import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(value: any[], arg: string, column?:string): any {
    if (!value) return [];
    if (!arg) return value;
    return value.filter(
      item => {
        if(!column) return item.nom.toLowerCase().includes(arg.toLowerCase());
        else {
          let strg1 = item[column] + ' ' +item.nom,
          strg2 = item.nom + ' ' +item[column];
          return strg1.toLowerCase().includes(arg.toLowerCase()) || strg2.toLowerCase().includes(arg.toLowerCase());
        }
      }
    );
  }

}
