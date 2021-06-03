import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthStoreService} from './auth-store.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authStore: AuthStoreService
    ) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // 1. recupero del token
        // 2. se OK lascio andare ( true ) altrimenti verso step di login
        return this.authStore.authStore$.pipe(
            tap(
                store => {
                    if (!store || !store.token) {
                        this.router.navigateByUrl('login');
                    }
                }
            ),
            map(
                store => !!store && !!store.token
            )
        );
    }
}
