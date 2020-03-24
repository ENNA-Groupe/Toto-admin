import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifsPageRoutingModule } from './tarifs-routing.module';

import { TarifsPage } from './tarifs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifsPageRoutingModule
  ],
  declarations: [TarifsPage]
})
export class TarifsPageModule {}
