import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findGroup'
})
export class FindGroupPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
