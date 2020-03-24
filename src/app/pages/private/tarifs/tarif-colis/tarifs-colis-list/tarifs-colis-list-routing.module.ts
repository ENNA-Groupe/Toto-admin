import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifsColisListPage } from './tarifs-colis-list.page';

const routes: Routes = [
  {
    path: '',
    component: TarifsColisListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifsColisListPageRoutingModule {}
