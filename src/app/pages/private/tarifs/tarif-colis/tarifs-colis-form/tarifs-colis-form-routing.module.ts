import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifsColisFormPage } from './tarifs-colis-form.page';

const routes: Routes = [
  {
    path: '',
    component: TarifsColisFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifsColisFormPageRoutingModule {}
