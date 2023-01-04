import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[],filterString: string , propname:string): any {
    const result:any=[];
    if(!value || filterString ==='' || propname === '')
    {
      return value;
    }
   value.forEach((a:any)=>
   {
      if(a[propname].toLowerCase().includes(filterString.toLowerCase()))
      {
        result.push(a);
      }
   });
   return result;
  }

}
