import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursiersPage } from './coursiers.page';

const routes: Routes = [
  {
    path: '',
    component: CoursiersPage
  },
  {
    path: 'coursiers-list',
    loadChildren: () => import('./coursiers-list/coursiers-list.module').then( m => m.CoursiersListPageModule)
  },
  {
    path: 'coursiers-form',
    loadChildren: () => import('./coursiers-form/coursiers-form.module').then( m => m.CoursiersFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursiersPageRoutingModule {}
