import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';
import moment, { Moment } from 'moment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  index: number = 0;


  bookingToUpdate!: Booking;

  showRooms(i: number) {
    this.index = i
    localStorage.setItem('indexSede', i.toString())
  }





  bookingIndex: number = 0;

  showBookings(i: number) {
    this.bookingIndex = i;
    localStorage.setItem('indexRoom', i.toString())
  }




  detailBookingIndex: number = 0;
  showThisBooking(i: number) {
    this.detailBookingIndex = i;

  }


  toUpdate(booking: Booking) {
    this.bookingToUpdate = booking;
  }



  currentDate!: Moment;
  adding(newDate: Moment) {
    this.currentDate = newDate;
    localStorage.setItem('date', this.currentDate.toString())
  }

  getCurrentDate():Moment{
    return moment(localStorage.getItem('date')) 
  }





  loggedIn = false;
  user!: User;

  emptyUser!: User;

  logIn(newUser: User) {
    this.loggedIn = true;
    this.user = newUser;
    localStorage.setItem('user', btoa(JSON.stringify(newUser)))
    localStorage.setItem('loggedIn', btoa(JSON.stringify(this.loggedIn)))
  }



  exit() {
    this.loggedIn = false;
    this.user = this.emptyUser;
    localStorage.clear()
  }

  getLoggedIn(): boolean {
    let data = localStorage.getItem('loggedIn')
    if (data) {
      return JSON.parse(atob(data));

    } else {
      return false
    }
  }

  getUser(): User | boolean {
    let data = localStorage.getItem('user')
    if (data) {
      return JSON.parse(atob(data)) as User
    } else {
      return false
    }


  }
}
