import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean | UrlTree {
    if (this.auth.isAuthenticated()) return true;
    // redirect to login and include returnUrl
    const returnUrl = state?.url || '/';
    const tree = this.router.parseUrl('/login');
    tree.queryParams = { redirect: returnUrl };
    return tree;
  }
}
