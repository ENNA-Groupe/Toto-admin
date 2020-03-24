import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonSlides } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';

import { PrintPage } from './pages/print/print.page';
import { LocationInvoiceComponent } from './pages/print/location-invoice/location-invoice.component';
import { ConsommationInvoiceComponent } from './pages/print/consommation-invoice/consommation-invoice.component';

import { NgxPicaModule } from 'ngx-pica';
// const url = "http://ennahotel.eu-4.evennode.com/";
// const url = 'http://192.168.1.70:3000/';
const url = 'http://192.168.173.197:3000/';
// const url = 'http://localhost:3000/';
const config: SocketIoConfig = { url: url, options: {} };
const components: any[] = [ 
  // FonctionFormComponent,
  // FonctionProfilComponent,
  // UserFormComponent,
  // UserProfilComponent,
  // TypeFormComponent,
  // TypeProfilComponent,
  // ChambreFormComponent,
  // ChambreProfilComponent,
  // CategorieFormComponent,
  // CategorieProfilComponent,
  // ProduitFormComponent,
  // ProduitProfilComponent,
  // IntrantFormComponent,
  // IntrantProfilComponent,
  // ProprieteFormComponent,
  // EntreeFormComponent,
  // EntreeProfilComponent,
  // SortieFormComponent,
  // SortieProfilComponent,
  // ControlFormComponent,
  // ControlProfilComponent,
  // FournisseurFormComponent,
  // FournisseurProfilComponent,
  // TableFormComponent,
  // TableProfilComponent,
  // ConsommationFormComponent,
  // ConsommationProfilComponent,
  // ClientFormComponent,
  // ClientProfilComponent,
  // LocationFormComponent,
  // LocationProfilComponent,
  // ChooseClientComponent,
  // MesureFormComponent,
  // MesureProfilComponent,
  // PosteProfilComponent,
  // PosteFormComponent,
  // SalaireFormComponent,
  // SalaireProfilComponent
]

@NgModule({
  declarations: [
    AppComponent , PrintPage, LocationInvoiceComponent, ConsommationInvoiceComponent,...components
  ],
  entryComponents: [
   ...components
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,PipesModule,
     SocketIoModule.forRoot(config),ReactiveFormsModule, FormsModule, NgxPicaModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
