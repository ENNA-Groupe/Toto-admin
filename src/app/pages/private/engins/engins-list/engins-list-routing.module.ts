import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnginsListPage } from './engins-list.page';

const routes: Routes = [
  {
    path: '',
    component: EnginsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnginsListPageRoutingModule {}
