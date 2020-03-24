import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifDistancePage } from './tarif-distance.page';

const routes: Routes = [
  {
    path: '',
    component: TarifDistancePage
  },
  {
    path: 'tarif-distance-list',
    loadChildren: () => import('./tarif-distance-list/tarif-distance-list.module').then( m => m.TarifDistanceListPageModule)
  },
  {
    path: 'tarif-distance-form',
    loadChildren: () => import('./tarif-distance-form/tarif-distance-form.module').then( m => m.TarifDistanceFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifDistancePageRoutingModule {}
