import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifsColisFormPageRoutingModule } from './tarifs-colis-form-routing.module';

import { TarifsColisFormPage } from './tarifs-colis-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifsColisFormPageRoutingModule
  ],
  declarations: [TarifsColisFormPage]
})
export class TarifsColisFormPageModule {}
