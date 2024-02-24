import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Site } from '../interfaces/site';
import { ApiPaths } from '../enums/api-paths';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }

  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${ApiPaths.Main}${ApiPaths.Sites}`);
  }



}
