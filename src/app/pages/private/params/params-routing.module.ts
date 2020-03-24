import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParamsPage } from './params.page';

const routes: Routes = [
  {
    path: '',
    component: ParamsPage,
    children: [
      {path: '', redirectTo: 'mesures', pathMatch: 'full'},
      { path: 'controls', loadChildren: './controls/controls.module#ControlsPageModule' },
      { path: 'infos', loadChildren: './infos/infos.module#InfosPageModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamsPageRoutingModule {}
