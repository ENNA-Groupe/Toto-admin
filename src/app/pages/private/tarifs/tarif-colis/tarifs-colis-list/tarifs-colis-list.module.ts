import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifsColisListPageRoutingModule } from './tarifs-colis-list-routing.module';

import { TarifsColisListPage } from './tarifs-colis-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifsColisListPageRoutingModule
  ],
  declarations: [TarifsColisListPage]
})
export class TarifsColisListPageModule {}
