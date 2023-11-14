import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsPage } from './cars.page';

const routes: Routes = [
  {
    path: '',
    component: CarsPage
  },
  {
    path: 'cars-detail',
    loadChildren: () => import('./cars-detail/cars-detail.module').then( m => m.CarsDetailPageModule)
  },
  {
    path: 'editcar',
    loadChildren: () => import('./editcar/editcar.module').then( m => m.EditcarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsPageRoutingModule {}
