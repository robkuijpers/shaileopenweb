import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
        //
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let user = localStorage.getItem('user');

        if (user) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
