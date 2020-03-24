import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifColisPage } from './tarif-colis.page';

const routes: Routes = [
  {
    path: '',
    component: TarifColisPage
  },
  {
    path: 'tarifs-colis-form',
    loadChildren: () => import('./tarifs-colis-form/tarifs-colis-form.module').then( m => m.TarifsColisFormPageModule)
  },
  {
    path: 'tarifs-colis-list',
    loadChildren: () => import('./tarifs-colis-list/tarifs-colis-list.module').then( m => m.TarifsColisListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifColisPageRoutingModule {}
