import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarif } from '../../models/Tarif.interface';
import { URL_API } from '../../var';

@Injectable({
  providedIn: 'root'
})
export class TarifService {

  constructor(private httpClient: HttpClient) { }

  getPricesAndMonths(): Observable<Tarif[]> {
    return this.httpClient.post<Tarif[]>(URL_API + '/api/booking/get-prices-&-months', null);
  }
}
