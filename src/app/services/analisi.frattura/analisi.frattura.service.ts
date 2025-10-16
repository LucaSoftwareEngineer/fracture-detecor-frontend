import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AnalisiFratturaResponse } from "../../interfaces/AnalisiFratturaResponse";
import { Observable } from "rxjs";
import { API } from "../../api.config";
import SecureLS from "secure-ls";

@Injectable({
  providedIn: 'root'
})
export class AnalisiFratturaService {

  api = new API();
  cookie = new SecureLS();

  constructor(
    private http: HttpClient
  ) { }

  callHttpAnalisiLastra(payload: FormData): Observable<AnalisiFratturaResponse> {

    const currentToken = this.cookie.get('token');

    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${currentToken}`
    });

    return this.http.post<AnalisiFratturaResponse>(
      this.api.ANALISI_FRATTURA_NEW,
      payload,
      { headers: httpHeaders }
    );
  }
}
