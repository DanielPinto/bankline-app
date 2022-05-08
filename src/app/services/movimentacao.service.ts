import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://danp-dio-bankline-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(`${baseUrl}/movimentacao`);
  }

  create(movimentacao: any): Observable<any> {
    return this.http.post(`${baseUrl}/movimentacao`, movimentacao);
  }
}