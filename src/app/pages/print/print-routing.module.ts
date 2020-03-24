import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintPage } from './print.page';
import { ConsommationInvoiceComponent } from './consommation-invoice/consommation-invoice.component';
import { LocationInvoiceComponent } from './location-invoice/location-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: PrintPage,
    children: [
      { path: 'consommation-facture/:consommationId', component: ConsommationInvoiceComponent },
      { path: 'location-facture/:locationId', component: LocationInvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintPageRoutingModule {}
