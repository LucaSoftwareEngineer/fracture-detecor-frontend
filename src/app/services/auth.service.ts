import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../api.config';
import { Observable } from 'rxjs';
import { AuthRequest } from '../interfaces/AuthRequest';
import { AuthResponse } from '../interfaces/AuthResponse';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { RegisterResponse } from '../interfaces/RegisterResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = new API();

  constructor(private http: HttpClient) {}

  loginCallHttp(username: string, password: string): Observable<AuthResponse> {
    const json: AuthRequest = {
      username: username,
      password: password,
    };
    return this.http.post<AuthResponse>(this.api.AUTH_LOGIN, json);
  }

  registerCallHttp(
    name: string,
    surname: string,
    username: string,
    password: string,
    accountTypeSelected: number
  ): Observable<RegisterResponse> {
    const json: RegisterRequest = {
      name: name,
      surname: surname,
      username: username,
      password: password,
      accountTypeSelected: accountTypeSelected,
    };
    return this.http.post<RegisterResponse>(this.api.AUTH_REGISTER, json);
  }
}
