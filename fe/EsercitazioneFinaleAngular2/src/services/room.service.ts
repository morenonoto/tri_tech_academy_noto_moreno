import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {}



  getRooms(id: number): Observable<Room[]> {

    let params = new HttpParams()
    .set('id', id);
    

    return this.http.get<Room[]>(`${ApiPaths.Main}${ApiPaths.SiteRooms}`, {params: params})
  } 



  getRoomById(index: number): Observable<Room> {

    let params = new HttpParams()
    .set('id', index);


    return this.http.get<Room>(`${ApiPaths.Main}${ApiPaths.roomById}`, {params: params})
  }


}
