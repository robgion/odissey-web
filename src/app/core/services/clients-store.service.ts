import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Client} from '../../model/client';
import {ClientsActionsService} from './clients-actions.service';

export interface ClientsState {
    entities: Client[];
    activeClientId: number;
}


@Injectable()
export class ClientsStoreService {

    private initialState: ClientsState = {
        entities: [],
        activeClientId: null
    };

    /** Stato della lista di clienti */
    private clientsSubect: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(this.initialState.entities);
    public clients$: Observable<Client[]> = this.clientsSubect.asObservable();

    /** Stato del cliente selezionato */
    private activeClientSubect: BehaviorSubject<Client> = new BehaviorSubject<Client>(null);
    public activeClient$: Observable<Client> = this.activeClientSubect.asObservable();


    constructor(
        private clientsActions: ClientsActionsService
    ) {
    }

    /**
     * Caricamento della lista dei clienti
     */
    public loadClientList(): void {
        this.clientsActions.loadClients().subscribe(
            (response: Client[]) => {
                this.initialState.entities = [...response];
                this.clientsSubect.next(this.initialState.entities);
            }
        );
    }

    /**
     * Recupero dell'invoice selezionata
     */
    public setActiveClient(id: number): void {
        this.initialState.activeClientId = id;
        this.activeClientSubect.next(this.initialState.entities.find(
            inv => inv.id === id
        ));
    }

    public addClient(client: Client): void {
        this.clientsActions.addClient(client).subscribe(
            response => {
                if (response) {
                    this.initialState.entities = [
                        ...this.initialState.entities,
                        client
                    ];
                    this.clientsSubect.next(this.initialState.entities);
                }
            }
        );
    }

    public editClient(client: Client): void {
        this.clientsActions.editClient(client).subscribe(
            response => {
                if (response) {
                    this.initialState.entities = [
                        ...this.initialState.entities.map(
                            en => en.id === client.id ? {...client} : en
                        )
                    ];
                    this.clientsSubect.next(this.initialState.entities);
                }
            }
        )
    }
}
