import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypesFormPage } from './types-form.page';

const routes: Routes = [
  {
    path: '',
    component: TypesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesFormPageRoutingModule {}
