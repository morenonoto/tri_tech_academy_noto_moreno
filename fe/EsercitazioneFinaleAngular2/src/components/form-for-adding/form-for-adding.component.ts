import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Site } from '../../interfaces/site';
import { Room } from '../../interfaces/room';
import { SiteService } from '../../services/site.service';
import { RoomService } from '../../services/room.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Booking } from '../../interfaces/booking';
import { User } from '../../interfaces/user';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../interfaces/reservation';
import moment, { Moment } from 'moment';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-form-for-adding',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule, MatProgressSpinnerModule],
  templateUrl: './form-for-adding.component.html',
  styleUrl: './form-for-adding.component.css'
})
export class FormForAddingComponent implements OnInit {


  constructor(private siteService: SiteService, private roomService: RoomService, private fb: FormBuilder, private bookingService: BookingService, private mainService: MainService, private router: Router) { }


  faxmark = faXmark;

  sites: Site[] = [];
  rooms: Room[] = [];

  selectedSite!: Site;

  selectedDone: boolean = true;

  bookingToAdd!: Booking;

  start!: Moment;
  end!: Moment;

  forTry: Booking[] = []

  valid!: boolean;


  toAdd!: Reservation;


  added = false;
  notAdded = false;



  currentDate = this.mainService.getCurrentDate();


  defaultUser: User = JSON.parse(atob(localStorage.getItem('user')!))


  roomToAdd!: Room;


  reservations: Reservation[] = []


  occupied = false;
  impossible = false;

  firstTime=true;


  loading = false;


  booking: FormGroup = this.fb.group({
    title: ['', Validators.required],
    startDate: ['', [Validators.required ]],
    endDate: ['', [Validators.required ]],
    numberOfParticipants: ['', Validators.required],
    techNecessities: ['']
  })


  startValue=''
  endValue=''

  ngOnInit(): void {
    this.roomService.getRoomById(Number(localStorage.getItem('indexRoom'))).subscribe(room => this.roomToAdd = room);
    
  }



  startDate() {
    this.start = this.booking.value.startDate
    this.firstSection()
  }


  endDate() {
    this.end = this.booking.value.endDate
    this.toAdd = {
      startDate: this.start,
      endDate: this.end
    }
  }



  creaPrenotazione() {


    this.loading = true;


    this.toAdd = {
      startDate: this.booking.value.startDate,
      endDate: this.booking.value.endDate
    }



    let startTime = this.booking.value.startDate;
    let endTime = this.booking.value.endDate;

    const startDay = moment(this.currentDate.startOf('day'));
    const endDay = moment(this.currentDate.startOf('day'));

    const newStartDate = moment(startDay.add(startTime));
    const newEndDate = moment(endDay.add(endTime));


    this.bookingToAdd = {
      id: NaN,
      title: this.booking.value.title,
      startDate: newStartDate.add(1, 'hours').toDate(),
      endDate: newEndDate.add(1, 'hours').toDate(),
      room: this.roomToAdd,
      user: this.defaultUser,
      numberOfParticipants: this.booking.value.numberOfParticipants,
      techNecessities: this.booking.value.techNecessities
    }

    this.bookingService.addBooking(this.bookingToAdd).subscribe(response => {

      if (response === true) {
        this.loading = false;
        this.added = true;
      } else {
        this.loading = false;
        this.notAdded = true;
      }

    });

  }






  firstSection() {

    this.bookingService.getBookingByRoomId(this.roomToAdd.id).subscribe(bookings => {
      this.forTry = bookings
      this.secondSection()
    });
  }

  secondSection() {

    for (let i = 0; i < this.forTry.length; i++) {

      let singleReservation = {
        startDate: moment(this.forTry[i].startDate),
        endDate: moment(this.forTry[i].endDate)
      }

      this.reservations.push(singleReservation)

    }
  }



  close() {
    this.booking.reset();
    this.added = false;
    this.router.navigate(['/agenda']);
  }


  negativeClose() {
    this.notAdded = false;
  }

  DateValidator():boolean {
       
      let isOccupied: Boolean = false;
      let isImpossible: Boolean = false;
    
      let startTime = this.booking?this.booking.value.startDate:null
      let endTime = this.booking?this.booking.value.startDate:null

      let day = this.currentDate
      let allReservations = this.reservations

      this.firstTime=false


  




      if (!startTime && !endTime) {
        return true
      }


      const startDay = moment(day.startOf('day'));
      const endDay = moment(day.startOf('day'));

      const startDate = moment(startDay.add(this.startValue));
      const endDate = moment(endDay.add(this.endValue));

      const today = moment()



      let newReservation = {
        startDate: startDate,
        endDate: endDate
      }



      if (startDate > today && newReservation.startDate < newReservation.endDate && newReservation.startDate.day() === newReservation.endDate.day()) {
        newReservation.startDate.add(59, "seconds")

        for (let reservation of allReservations) {
          if (newReservation.startDate >= reservation.startDate && newReservation.endDate <= reservation.endDate) {
            isOccupied = true;
            break;
          }
          if (newReservation.startDate < reservation.startDate && newReservation.endDate > reservation.startDate) {
            isOccupied = true;
            break;
          }
          if (newReservation.startDate < reservation.endDate && newReservation.endDate > reservation.endDate) {
            isOccupied = true;
          }

        }
      } else {
        isImpossible = true;
      }




      if (isOccupied) {
        this.occupied = true;
        this.impossible = false;
        return true;
      }
      else if (isImpossible) {
        this.occupied = false;
        this.impossible = true;
        return  true 
      }

      this.occupied = false;
      this.impossible = false;
      
      return false;


  };


  onChangeDate(){
      this.DateValidator()
  }


  
}

