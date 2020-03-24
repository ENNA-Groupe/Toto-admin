import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PrintPage } from './pages/print/print.page';
import { ConsommationInvoiceComponent } from './pages/print/consommation-invoice/consommation-invoice.component';
import { LocationInvoiceComponent } from './pages/print/location-invoice/location-invoice.component';

const routes: Routes = [
  { path: '', redirectTo:'public', pathMatch:'full' },
  { path: 'private', loadChildren: './pages/private/private.module#PrivatePageModule' },
  { path: 'public', loadChildren: './pages/public/public.module#PublicPageModule' },
  { 
    path: 'print', 
    component: PrintPage, 
    children: [
      { path: 'consommation-facture/:consommationId', component: ConsommationInvoiceComponent },
      { path: 'location-facture/:locationId', component: LocationInvoiceComponent }
    ]
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
