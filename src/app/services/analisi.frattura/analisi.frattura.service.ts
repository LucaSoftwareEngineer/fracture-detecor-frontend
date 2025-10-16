import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AnalisiFratturaResponse } from "../../interfaces/AnalisiFratturaResponse";
import { Observable } from "rxjs";
import { API } from "../../api.config";
import SecureLS from "secure-ls";
import {AnalisiFratturaItemStorico} from "../../interfaces/AnalisiFratturaItemStorico";

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

  callHttpStoricoAnalisiLastre(id:number): Observable<AnalisiFratturaItemStorico[]> {
    const currentToken = this.cookie.get('token');
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${currentToken}`
    });

    return this.http.get<AnalisiFratturaItemStorico[]>(
      this.api.ANALISI_FRATTURA_STORICO.concat(id.toString()),
      { headers: httpHeaders }
    );
  }

  callHttpEliminaAnalisiDaStorico(idAnalisi:number, idUser:number): Observable<any>{
    const currentToken = this.cookie.get('token');
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${currentToken}`
    });
    return this.http.delete<any>(this.api.ANALISI_FRATTURA_DELETE.concat(idAnalisi.toString().concat('/').concat(idUser.toString())), { headers: httpHeaders });
  }
}
