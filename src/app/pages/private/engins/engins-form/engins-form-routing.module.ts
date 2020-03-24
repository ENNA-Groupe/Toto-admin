import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnginsFormPage } from './engins-form.page';

const routes: Routes = [
  {
    path: '',
    component: EnginsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnginsFormPageRoutingModule {}
