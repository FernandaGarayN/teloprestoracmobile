import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private authService : AuthService,
  ) {}

  goToCars(){
    this.router.navigateByUrl('cars')
  }
  goToProfile(){
    this.router.navigateByUrl('profile')
  }

  logout(){
    this.authService.logout()
  }
}
