import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isNotAuthenticated();
  }

  isNotAuthenticated(): boolean {
    if (this.authService.isAuthenticated()) {
       if (this.authService.isAuthorized('client')) {
         this.router.navigate(['/cine'], {
           queryParams: { returnUrl: '/cine' },
         });
         return false;
       } else if (this.authService.isAuthorized('provider')) {
         this.router.navigate(['/layout'], {
           queryParams: { returnUrl: '/layout' },
         });
       }
      return false;
    } else {
      return true;
    }
  }
}
/* if (!this.authService.isAuthorized) {
  this.router.navigate(['/cine']);
  return false;
} else {
  this.router.navigate(['/cine'], {
    queryParams: { returnUrl: '/layout' },
  });
}
 */
