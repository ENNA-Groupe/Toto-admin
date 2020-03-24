import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifDistanceFormPage } from './tarif-distance-form.page';

const routes: Routes = [
  {
    path: '',
    component: TarifDistanceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifDistanceFormPageRoutingModule {}
