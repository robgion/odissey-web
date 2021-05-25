import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';

@Injectable()
export class UsersService extends BaseService {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    /**
     * Metodo di recupero degli utenti
     */
    public loadUsers(): Observable<any>{
        return this.http.get( this.buildUrl('users') );
    }

    functionalParam = (parma1: number) => {
        console.log(parma1);
    }
}
