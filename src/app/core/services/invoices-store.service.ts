import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Invoice} from '../../model/invoice';
import {InvoicesActionsService} from './invoices-actions.service';

export interface InvoicesState {
    entities: Invoice[];
    activeInvoiceId: number;
}


@Injectable()
export class InvoicesStoreService {

    private initialState: InvoicesState = {
        entities: [],
        activeInvoiceId: null
    };

    /** Stato della lista di invoices */
    private invoicesSubect: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>(this.initialState.entities);
    public invoices$: Observable<Invoice[]> = this.invoicesSubect.asObservable();

    /** Stato dell'invoice selezionata */
    private activeInvoiceSubect: BehaviorSubject<Invoice> = new BehaviorSubject<Invoice>(null);
    public activeInvoice$: Observable<Invoice> = this.activeInvoiceSubect.asObservable();


    constructor(
        private invoiceActions: InvoicesActionsService
    ) {
    }

    /**
     * Caricamento della lista delle fatture
     */
    public loadInvoices(): void {
        this.invoiceActions.loadInvoices().subscribe(
            (response: Invoice[]) => {
                this.initialState.entities = [...response];
                this.invoicesSubect.next(this.initialState.entities);
            }
        );
    }

    /**
     * Recupero dell'invoice selezionata
     */
    public setActiveInvoice(id: number): void {
        this.initialState.activeInvoiceId = id;
        this.activeInvoiceSubect.next(this.initialState.entities.find(
            inv => inv.id === id
        ));
    }
}
