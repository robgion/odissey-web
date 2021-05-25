import { Component, OnInit } from '@angular/core';
import {UiStoreService} from '../../../core/services/ui-store.service';
import {InvoicesStoreService} from '../../../core/services/invoices-store.service';
import {Observable} from 'rxjs';
import {Invoice} from '../../../model/invoice';
import {ClientsStoreService} from '../../../core/services/clients-store.service';
import {Client} from '../../../model/client';
import {Router} from '@angular/router';

@Component({
  selector: 'tcs-invoices-editor',
  template: `
    <tcs-switch-panels-container
        [titleLeftPanel]="'INVOICES'"
        [titleRightPanel]="'CUSTOMERS'"
    >
      <div left>
        <tcs-invoices-list
            [invoices]="invoices$ | async"
            [activeInvoice]="invoice$ | async"
            (setActiveInvoice)="setActiveInvoice($event)"
        ></tcs-invoices-list>
      </div>

      <div center class="mt-5">
        <tcs-invoice-form
            [isInvoicesPanelOpened]="!(uiStoreService.uiStore$ | async).isLeftPanelOpened"
            [isClientPanelOpened]="!(uiStoreService.uiStore$ | async).isRightPanelOpened"
            [activeInvoice]="invoice$ | async"
            [clients]="clients$ | async"
            (openPanelClients)="openClientsPanel()"
            (openPanelInvoices)="openInvoicesPanel()"
            (printInvoice)="printInvoice()"
        ></tcs-invoice-form>
      </div>

      <div right>
        <tcs-clients-panel
            [show]="(uiStoreService.uiStore$ | async).isRightPanelOpened"
            [clients]="clients$ | async"
            (addClient)="addClient($event)"
            (editClient)="editClient($event)"
            (closePanel)="closeClientsPanel()"
        ></tcs-clients-panel>
      </div>
    </tcs-switch-panels-container>
  `,
  styles: []
})
export class InvoicesEditorComponent implements OnInit {

  /** Observable per la gestione delle fatture */
  invoices$: Observable<Invoice[]>;
  invoice$: Observable<Invoice>;
  /** Observable per la gestione dei clienti */
  clients$: Observable<Client[]>;
  client$: Observable<Client>;

  constructor(
      private router: Router,
      public uiStoreService: UiStoreService,
      private invoicesStore: InvoicesStoreService,
      private clientsStore: ClientsStoreService
  ) {
    this.invoices$ = invoicesStore.invoices$;
    this.invoice$ = invoicesStore.activeInvoice$;
    this.clients$ = clientsStore.clients$;
    this.client$ = clientsStore.activeClient$;
  }

  ngOnInit(): void {
    this.invoicesStore.loadInvoices();
    this.clientsStore.loadClientList();
  }

  openInvoicesPanel(): void {
    this.uiStoreService.showLeftPanel = true;
  }

  openClientsPanel(): void {
    this.uiStoreService.showRightPanel = true;
  }
  closeClientsPanel(): void {
    this.uiStoreService.showRightPanel = false;
  }
  /** Gestione delle fatture */
  setActiveInvoice(invoice: Invoice): void {
    this.invoicesStore.setActiveInvoice(invoice.id);
  }

  /** Gestione dei clienti */
  addClient(client: Client): void {
    this.clientsStore.addClient(client);
  }

  editClient(client: Client): void {
    this.clientsStore.editClient(client);
  }

  printInvoice(): void {
    this.router.navigateByUrl('invoices/print');
  }
}
