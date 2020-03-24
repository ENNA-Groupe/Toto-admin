import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifDistanceListPage } from './tarif-distance-list.page';

const routes: Routes = [
  {
    path: '',
    component: TarifDistanceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifDistanceListPageRoutingModule {}
