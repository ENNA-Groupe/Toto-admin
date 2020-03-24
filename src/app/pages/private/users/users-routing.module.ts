import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {path: '', redirectTo: 'users-list', pathMatch:'full'},
      {
        path: 'users-list',
        loadChildren: () => import('./users-list/users-list.module').then( m => m.UsersListPageModule)
      },
      {
        path: 'users-form/:id',
        loadChildren: () => import('./users-form/users-form.module').then( m => m.UsersFormPageModule)
      },
      {
        path: 'user-profil/:id',
        loadChildren: () => import('./user-profil/user-profil.module').then( m => m.UserProfilPageModule)
      }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
