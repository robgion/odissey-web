import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Invoice} from '../../../model/invoice';

@Component({
  selector: 'tcs-invoices-list',
  template: `
    <div>
      <li
          class="list-group-item  list-group-item-action d-flex flex-row justify-content-between"
          *ngFor="let invoice of invoices"
          [ngClass]="{'active-invoice': invoice.id === activeInvoice?.id }"
          (click)="setActiveInvoice.emit(invoice)"
      >
        <div>
          <small>#{{invoice.invoiceNumber}}.  {{invoice.date | date}}</small>
          <div>{{invoice.subject}} </div>
        </div>
        <div>
          <span>{{invoice.total | currency}} </span>
          <i class="fa fa-trash-o text-danger" (click)="deleteHandler(invoice, $event)"></i>
        </div>
      </li>
    </div>
  `,
  styles: [`
      .active-invoice {
        background-color: #ffc107;
      }
  `]
})
export class InvoicesListComponent implements OnInit {

  @Input() invoices: Invoice[];
  @Input() activeInvoice: Invoice;
  @Output() delete: EventEmitter<Invoice> = new EventEmitter();
  @Output() setActiveInvoice: EventEmitter<Invoice> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteHandler(invoice: Invoice, event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(invoice);
  }
}
