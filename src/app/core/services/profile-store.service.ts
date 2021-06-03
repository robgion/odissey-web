import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {ProfileActionsService} from './profile-actions.service';

export class ClientsState {
    entity: User;
}


@Injectable()
export class ProfileStoreService {

    private initialState: ClientsState = new ClientsState();

    /** Stato della lista di clienti */
    private profileSubect: BehaviorSubject<User> = new BehaviorSubject<User>(this.initialState.entity);
    public profile$: Observable<User> = this.profileSubect.asObservable();

    constructor(
        private profileActions: ProfileActionsService
    ) {
    }

    public loadProfile(): void {
        this.profileActions.load().subscribe(
            (response: User) => {
                this.initialState.entity = response;
                this.profileSubect.next(this.initialState.entity);
            }
        );
    }
}
