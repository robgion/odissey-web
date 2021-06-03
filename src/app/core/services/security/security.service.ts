import {BaseService} from '../base.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionData} from '../../../model/user';
import {AuthStoreService} from './auth-store.service';

@Injectable()
export class SecurityService extends BaseService {

    constructor(
        private http: HttpClient,
        private authStore: AuthStoreService
    ) {
        super();
    }

    public login(payload: SessionData): void {

        // this.http.post(this.buildUrl('/login'), payload);
        this.http.get(this.buildUrl('login')).subscribe(
            (resp: SessionData) => {
                console.log(resp);
                this.authStore.user = resp;
            }
        );
    }
}

