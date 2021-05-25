import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {User} from '../../model/user';

@Injectable()
export class ProfileActionsService extends BaseService{
  constructor(private http: HttpClient) {
    super();
  }

  load(): Observable<any> {
    return this.http.get<User>(this.buildUrl('profile'));
  }

  edit(profile: User): Observable<any> {
    return this.http.patch<User>(this.buildUrl('profile'), profile);
  }
}
