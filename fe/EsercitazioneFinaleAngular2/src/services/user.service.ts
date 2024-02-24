import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from '../enums/api-paths';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userCheck(email: string, password: string): Observable<Boolean> {

    let parameters = new HttpParams()
    .set('email', email)
    .set('password', password)

    return this.http.get<Boolean>(`${ApiPaths.Main}${ApiPaths.checkUser}`, {params: parameters})

  }


  userByEmail(email: string): Observable<User> {
    
    let params = new HttpParams()
    .set('email', email)

    return this.http.get<User>(`${ApiPaths.Main}${ApiPaths.userByEmail}`, {params: params})
  }



}
