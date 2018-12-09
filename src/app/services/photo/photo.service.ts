import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../../models/photo.interface';
import { Observable } from 'rxjs';
import { URL_API } from '../../var';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photosList: Photo[] = [{
    id: 0,
    url: '',
    title: '',
    subtitle: ''
  }];

  constructor(private httpClient: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    let headers = new HttpHeaders();
    return this.httpClient.post<Photo[]>(URL_API + '/api/photo/get-photos', null, { headers: null });
  }
}
