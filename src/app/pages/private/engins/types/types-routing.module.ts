import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypesPage } from './types.page';

const routes: Routes = [
  {
    path: '',
    component: TypesPage
  },
  {
    path: 'types-list',
    loadChildren: () => import('./types-list/types-list.module').then( m => m.TypesListPageModule)
  },
  {
    path: 'types-form',
    loadChildren: () => import('./types-form/types-form.module').then( m => m.TypesFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesPageRoutingModule {}
