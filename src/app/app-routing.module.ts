import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cars',
    children:[
      {
        path: '',
        loadChildren: () => import('./pages/cars/cars.module').then( m => m.CarsPageModule)
      },
      {
        path:'new',
        loadChildren: () => import('./pages/cars/newcar/newcar.module').then( m => m.NewcarPageModule)
      },
      {
        path:':carId',
        loadChildren: () => import('./pages/cars/cars-detail/cars-detail.module').then( m => m.CarsDetailPageModule)
      }      
    ]
   
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
