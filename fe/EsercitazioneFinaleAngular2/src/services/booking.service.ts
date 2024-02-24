import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../interfaces/booking';
import { ApiPaths } from '../enums/api-paths';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  toFilter: number = 0;


  getBookings(id: number): Observable<Booking[]> {

    let params = new HttpParams()
    .set('id', id);

    return this.http.get<Booking[]>(`${ApiPaths.Main}${ApiPaths.roomBookings}`, {params: params})
  } 



  getBookingById(id: number): Observable<Booking> {

    let parameters = new HttpParams()
    .set('id', id);

    return this.http.get<Booking>(`${ApiPaths.Main}${ApiPaths.bookingById}`, {params: parameters})
  }



  deleteBookingById(id: number) {

    let parameters = new HttpParams()
    .set('id', id)

    return this.http.delete(`${ApiPaths.Main}${ApiPaths.deleteBooking}`, {params: parameters});
  }



  updateBooking(booking: Booking): Observable<Boolean> {
    return this.http.put<Boolean>(`${ApiPaths.Main}${ApiPaths.Bookings}/${booking.id}`, booking)
  }



  addBooking(booking: Booking): Observable<Boolean> {
    return this.http.post<Boolean>(`${ApiPaths.Main}${ApiPaths.Bookings}`, booking)
  }


  getBookingByRoomId(id: number): Observable<Booking[]> {

    let parameters = new HttpParams()
    .set('id', id);

    return this.http.get<Booking[]>(`${ApiPaths.Main}${ApiPaths.bookingByRoomIdOrderByDate}`, {params: parameters})

  }


  exportCsv(): Observable<Blob> {
    return this.http.get(`${ApiPaths.Main}${ApiPaths.exportCsv}`, { responseType: 'blob' });
  }


}
