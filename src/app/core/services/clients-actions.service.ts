import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client} from '../../model/client';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';

@Injectable()
export class ClientsActionsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  loadClients(): Observable<any> {
    return this.http.get<Client[]>(this.buildUrl('clients'));
  }

  deleteClient(client: Client): Observable<any> {
    return this.http.delete<Client>(this.buildUrl(`clients/${client.id}`));
  }

  addClient(client: Client): Observable<any> {
    return this.http.post<Client>(this.buildUrl('clients'), client);
  }

  editClient(client: Client): Observable<any> {
    return this.http.patch<Client>(this.buildUrl(`clients/${client.id}`), client);
  }
}
