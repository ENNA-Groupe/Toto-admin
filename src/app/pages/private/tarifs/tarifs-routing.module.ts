import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifsPage } from './tarifs.page';

const routes: Routes = [
  {
    path: '',
    component: TarifsPage
  },
  {
    path: 'tarif-distance',
    loadChildren: () => import('./tarif-distance/tarif-distance.module').then( m => m.TarifDistancePageModule)
  },
  {
    path: 'tarif-colis',
    loadChildren: () => import('./tarif-colis/tarif-colis.module').then( m => m.TarifColisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifsPageRoutingModule {}
