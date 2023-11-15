import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cars',
    canActivate: [AuthGuard],
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
        path:'edit/:carId',
        loadChildren: () => import('./pages/cars/editcar/editcar.module').then( m => m.EditcarPageModule)
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
