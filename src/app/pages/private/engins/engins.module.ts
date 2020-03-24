import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnginsPageRoutingModule } from './engins-routing.module';

import { EnginsPage } from './engins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnginsPageRoutingModule
  ],
  declarations: [EnginsPage]
})
export class EnginsPageModule {}
