import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicPage } from './public.page';

const routes: Routes = [
  {
    path: '',
    component: PublicPage,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login',
      loadChildren: './login/login.module#LoginPageModule' 
      },
      {path: 'change-password', 
      loadChildren: './change-password/change-password.module#ChangePasswordPageModule'
    }
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
  declarations: [PublicPage]
})
export class PublicPageModule {}
