import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnginsListPageRoutingModule } from './engins-list-routing.module';

import { EnginsListPage } from './engins-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnginsListPageRoutingModule
  ],
  declarations: [EnginsListPage]
})
export class EnginsListPageModule {}
