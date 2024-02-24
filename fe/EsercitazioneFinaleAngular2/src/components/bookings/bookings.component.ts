import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';
import moment, { Moment } from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, NgbModule, RouterLink],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit{

  constructor(private bookingService: BookingService, private mainService: MainService){}

  

  @Input() agendaDate!: Moment;

  bookings: Booking [] = [];
  formattedBookings: string[] = [];

  startHours: string [] = [];
  endHours: string[] = [];

  mySubscription!: any;


  toRemove: number = this.bookingService.toFilter;


  


  ngOnInit(): void {
    const index = this.mainService.bookingIndex ===0? Number(localStorage.getItem('indexRoom')):this.mainService.bookingIndex;
    this.mySubscription = this.bookingService.getBookingByRoomId(index).subscribe(bookings => {
      this.bookings = bookings;
      this.dataFormatter();
    })    
  }



  dataFormatter() {

    this.formattedBookings = this.bookings.map(booking => moment(booking.startDate).format('DD MM YYYY'));

    this.startHours = this.bookings.map(booking => moment(booking.startDate).format('HH:mm'));
    this.endHours = this.bookings.map(booking => moment(booking.endDate).format('HH:mm'));
  }



  showThisBooking(id: number) {
    this.mainService.showThisBooking(id);

  }

}
