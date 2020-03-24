import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifColisPageRoutingModule } from './tarif-colis-routing.module';

import { TarifColisPage } from './tarif-colis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifColisPageRoutingModule
  ],
  declarations: [TarifColisPage]
})
export class TarifColisPageModule {}
