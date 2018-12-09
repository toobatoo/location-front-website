import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookingToServer } from '../../models/bookingToServer.interface';
import { Observable } from 'rxjs';
import { Dates } from '../../utils/dates';
import { URL_API } from '../../var';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingList: BookingToServer[] = [{
    id: 0,
    date: '',
    price: 0,
    type: ''
  }];

  constructor(private httpClient: HttpClient) { }

  getBookingList() {
    return this.bookingList;
  }

  setBookingList(bookingList: BookingToServer[]) {
    this.bookingList = bookingList;
  }

  getInfosDatesFromServer(): Observable<BookingToServer[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let date_arrivee = Dates.FORMAT_DATE_FR_TO_EN(this.bookingList[0].date);
    let date_depart = Dates.FORMAT_DATE_FR_TO_EN(this.bookingList[this.bookingList.length - 1].date);

    let body = {
      "date_arrivee": date_arrivee,
      "date_depart": date_depart
    };

    return this.httpClient.post<BookingToServer[]>(URL_API + '/api/booking/get-infos-dates', body, { headers: headers });
  }

  daysDetailFree(listDays: number[], month: number, year: number): Observable<string[]> {

    let list_days_format: string[] = [];

    for (let i = 0; i < listDays.length; i++) {
      list_days_format[i] = Dates.FORMAT_DAY(listDays[i].toString());
    }
    let body = {
      "list_days": list_days_format,
      "month": Dates.FORMAT_MONTH((month + 1).toString()),
      "year": year
    };

    return this.httpClient.post<string[]>(URL_API + '/api/booking/get-days-free', body);
  }

  sendForm(form, datesId): Observable<Boolean> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = "form=" + JSON.stringify(form) + "&dates=" + datesId;

    return this.httpClient.post<Boolean>(URL_API + '/api/booking/set', body, options);
  }
}
