import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

    constructor(
        private htt: HttpClient
    ) {
    }

    /**
     * Metodo di recupero degli utenti
     */
    public loadUsers(): any[] {
        const users: any[] = [];
        return users;
    }
}
