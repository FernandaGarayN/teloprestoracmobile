import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcarPage } from './editcar.page';

const routes: Routes = [
  {
    path: '',
    component: EditcarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcarPageRoutingModule {}
