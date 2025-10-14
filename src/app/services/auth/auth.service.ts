import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../api.config';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../interfaces/AuthRequest';
import { AuthResponse } from '../../interfaces/AuthResponse';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import { RegisterResponse } from '../../interfaces/RegisterResponse';
import SecureLS from 'secure-ls';
import { TokenCheckResponse } from '../../interfaces/TokenCheckResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = new API();
  cookie = new SecureLS();

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

  logoutDestroyToken(): boolean {
    this.cookie.remove('token');
    if (!this.cookie.get('token')) {
      return true;
    }
    return false;
  }

  checkLoginIsTrue(): Observable<boolean> {
    return this.checkTokenHttpCall().pipe(map((json) => json.isValido));
  }

  checkTokenHttpCall(): Observable<TokenCheckResponse> {
    const json = {
      token: this.cookie.get('token'),
    };
    return this.http.post<TokenCheckResponse>(this.api.TOKEN_CHECK, json);
  }
}
