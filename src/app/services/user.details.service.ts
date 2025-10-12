import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetails} from "../interfaces/UserDetails";
import {API} from "../api.config";
import SecureLS from "secure-ls";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  API = new API();
  cookie = new SecureLS();

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<UserDetails> {
    let token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<UserDetails>(this.API.USER_DETAILS, { headers });
  }
}
