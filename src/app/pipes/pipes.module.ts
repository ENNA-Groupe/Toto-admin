import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByPipe } from './search-by.pipe';  //our pipe which we generate
import { SortByPipe } from './sort-by.pipe';
import { FilterByPipe } from './filter-by.pipe';
import { FindGroupPipe } from './find-group.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchByPipe, SortByPipe, FilterByPipe, FindGroupPipe],
  exports: [SearchByPipe, SortByPipe, FilterByPipe, FindGroupPipe]
})
export class PipesModule { }