import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnginsFormPageRoutingModule } from './engins-form-routing.module';

import { EnginsFormPage } from './engins-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnginsFormPageRoutingModule
  ],
  declarations: [EnginsFormPage]
})
export class EnginsFormPageModule {}
