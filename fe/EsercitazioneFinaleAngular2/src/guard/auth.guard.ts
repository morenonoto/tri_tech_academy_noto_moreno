import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {

    let data = localStorage.getItem('loggedIn')
    let isLogged;
    if (data) {
      isLogged = JSON.parse(atob(data))
    } else {
      isLogged = false
    }


    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}