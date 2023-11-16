import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            console.log('onloginStateChanged <--- true');
            console.log('User is not logged in');
            this.router.navigate(['/home']);
            resolve(false)
          } else {
            console.log('onloginStateChanged <--- true');
            resolve(true);
            ;
          }
        });
      });
    }
    
}


