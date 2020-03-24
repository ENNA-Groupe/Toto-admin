import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursiersListPage } from './coursiers-list.page';

const routes: Routes = [
  {
    path: '',
    component: CoursiersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursiersListPageRoutingModule {}
