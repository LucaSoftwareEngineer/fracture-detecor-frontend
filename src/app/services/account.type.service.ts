import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountTypeResponse } from '../interfaces/AccountTypeResponse';
import { API } from '../api.config';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  api = new API();

  constructor(private http: HttpClient) {}

  getAccountTypes(): Observable<AccountTypeResponse[]> {
    return this.http.get<AccountTypeResponse[]>(this.api.ACCOUNT_TYPE_LIST);
  }
}
