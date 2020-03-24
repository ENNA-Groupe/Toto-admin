import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursiersListPageRoutingModule } from './coursiers-list-routing.module';

import { CoursiersListPage } from './coursiers-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursiersListPageRoutingModule
  ],
  declarations: [CoursiersListPage]
})
export class CoursiersListPageModule {}
