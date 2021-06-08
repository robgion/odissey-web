import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable, Subject} from 'rxjs';
import {User} from '../../model/user';

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

    public getUser(id: number): Observable<User> {
        return this.http.get( this.buildUrl(`users/${id}`));
    }

    public findUserByEmail(email: string): Observable<any> {
        return this.http.get( this.buildUrl(`users?email=${email}`));
    }
}
