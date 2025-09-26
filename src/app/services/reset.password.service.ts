import { Injectable } from '@angular/core';
import { API } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordResetRequest } from '../interfaces/PasswordResetRequest';
import { PasswordUpdateResponse } from '../interfaces/PasswordUpdateResponse';
import { PasswordUpdateRequest } from '../interfaces/PasswordUpdateRequest';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  api = new API();

  constructor(private http: HttpClient) {}

  reset(json: PasswordResetRequest): Observable<any> {
    return this.http.post<any>(this.api.PASSWORD_RESET, json);
  }

  update(json: PasswordUpdateRequest): Observable<PasswordUpdateResponse> {
    return this.http.post<PasswordUpdateResponse>(
      this.api.PASSWORD_UPDATE,
      json
    );
  }
}
