import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursiersFormPage } from './coursiers-form.page';

const routes: Routes = [
  {
    path: '',
    component: CoursiersFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursiersFormPageRoutingModule {}
