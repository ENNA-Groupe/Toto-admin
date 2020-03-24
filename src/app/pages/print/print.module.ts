import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintPageRoutingModule } from './print-routing.module';

import { PrintPage } from './print.page';
import { ConsommationInvoiceComponent } from './consommation-invoice/consommation-invoice.component';
import { LocationInvoiceComponent } from './location-invoice/location-invoice.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintPageRoutingModule,
  ],
  declarations: [
    PrintPage,
    ConsommationInvoiceComponent,
    LocationInvoiceComponent
  ]
})
export class PrintPageModule { }
