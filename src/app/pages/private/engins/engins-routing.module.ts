import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnginsPage } from './engins.page';

const routes: Routes = [
  {
    path: '',
    component: EnginsPage
  },
  {
    path: 'types',
    loadChildren: () => import('./types/types.module').then( m => m.TypesPageModule)
  },
  {
    path: 'engins-list',
    loadChildren: () => import('./engins-list/engins-list.module').then( m => m.EnginsListPageModule)
  },
  {
    path: 'engins-form',
    loadChildren: () => import('./engins-form/engins-form.module').then( m => m.EnginsFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnginsPageRoutingModule {}
