import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../../var';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  sendMail(nom, prenom, mail, msg): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let body = {
      "nom": nom,
      "prenom": prenom,
      "mail": mail,
      "msg": msg
    };

    return this.httpClient.post<boolean>(URL_API + '/api/mail/send-mail-information', body, { headers: headers });
  }
}
