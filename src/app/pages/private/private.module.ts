import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivatePage } from './private.page';

const routes: Routes = [
  {
    path: '',
    component: PrivatePage,
    children: [
      {path: '', redirectTo: 'accueil', pathMatch: 'full'},
      {path: 'accueil', loadChildren: './accueil/accueil.module#AccueilPageModule'},
      { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
      { path: 'params', loadChildren: './params/params.module#ParamsPageModule' },
      { path: 'clients', loadChildren: './clients/clients.module#ClientsPageModule' },
      { path: 'coursiers', loadChildren: './coursiers/coursiers.module#CoursiersPageModule' },
      { path: 'engins', loadChildren: './engins/engins.module#EnginsPageModule' },
      { path: 'tarifs', loadChildren: './tarifs/tarifs.module#TarifsPageModule' },
      { path: 'stats', loadChildren: './stats/stats.module#StatsPageModule' },
      {path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule'},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivatePage]
})
export class PrivatePageModule {}
