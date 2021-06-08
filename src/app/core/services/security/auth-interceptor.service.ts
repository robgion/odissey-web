import {Injectable} from '@angular/core';
import {AuthStoreService} from './auth-store.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first, mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(
        private authStore: AuthStoreService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authStore.authStore$.pipe(
            first(),
            mergeMap(
                data => {
                    // Bearer token jwt
                    if (!!data && !!data.token) {
                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${data.token}`
                            }
                        });
                    }
                    return next.handle(req);
                }
            )
        );
    }
}
