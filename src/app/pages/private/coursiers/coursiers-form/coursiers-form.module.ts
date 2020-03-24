import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursiersFormPageRoutingModule } from './coursiers-form-routing.module';

import { CoursiersFormPage } from './coursiers-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursiersFormPageRoutingModule
  ],
  declarations: [CoursiersFormPage]
})
export class CoursiersFormPageModule {}
