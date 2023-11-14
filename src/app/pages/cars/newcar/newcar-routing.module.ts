import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcarPage } from './newcar.page';

const routes: Routes = [
  {
    path: '',
    component: NewcarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcarPageRoutingModule {}
