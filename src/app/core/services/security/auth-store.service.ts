import {BehaviorSubject, Observable} from 'rxjs';
import {SessionData} from '../../../model/user';

export class AuthStoreService {

    private authStoreSubject: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(null);
    public authStore$: Observable<SessionData> = this.authStoreSubject.asObservable();

    set user(data: SessionData) {
        // Object JS per la gestione del localstorage
        localStorage.clear();
        data.password = null;
        localStorage.setItem('sessionData', JSON.stringify(data) );

        const user = {...data};
        this.authStoreSubject.next(user);
    }

    get user(): SessionData {
        let user: SessionData = null;
        const data = localStorage.getItem('sessionData');
        if (data) {
            user = JSON.parse(data);
        }
        return user;
    }

    public isUserLogged(): boolean {
        const user: SessionData = this.user;
        // !! utilizzo dell'operatore con doppia negazione per verificare se la variabile è != null e != undefined
        return  !!user && !!user.token;
    }

    public logout(): void {
        localStorage.clear();
        this.authStoreSubject.next(null);
    }
}
