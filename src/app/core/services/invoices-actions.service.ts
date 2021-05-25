import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Invoice} from '../../model/invoice';

@Injectable()
export class InvoicesActionsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  loadInvoices(): Observable<any> {
    return this.http.get(this.buildUrl('invoices'));
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(this.buildUrl(`invoices/${id}`));
  }

  addInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(this.buildUrl('invoices'), invoice);
  }

  editInvoice(invoice: Partial<Invoice>): Observable<any> {
    return this.http.patch(this.buildUrl(`invoices/${invoice.id}`), invoice);
  }

  loadInvoice(id: string): Observable<any> {
    return this.http.get(this.buildUrl(`invoices/${id}`));
  }
}
