import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Site } from '../../interfaces/site';
import { Room } from '../../interfaces/room';
import { SiteService } from '../../services/site.service';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../../interfaces/booking';
import { User } from '../../interfaces/user';
import { BookingService } from '../../services/booking.service';
import { Reservation } from '../../interfaces/reservation';
import moment, { Moment } from 'moment';
import { MainService } from '../../services/main.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {

  constructor(private siteService: SiteService, private roomService: RoomService, private fb: FormBuilder, private bookingService: BookingService, private mainService: MainService) { }


  bookingInfo = this.mainService.bookingToUpdate;

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

  defaultUser: User = this.mainService.getUser() as User;

  roomToAdd!: Room;

  reservations: Reservation[] = []

  positiveResponse = false;
  negativeResponse = false;

  loading = false;

  occupied = false;
  impossible = false;

  firstTime=true;

  startValue:any;
  endValue: any;
  currentDate = this.mainService.getCurrentDate();




  booking: FormGroup = this.fb.group({
    title: [this.bookingInfo.title, Validators.required],
    startDate: [this.bookingInfo.startDate, [Validators.required]],
    endDate: [this.bookingInfo.endDate, [Validators.required]],
    numberOfParticipants: [this.bookingInfo.numberOfParticipants, Validators.required],
    techNecessities: [this.bookingInfo.techNecessities],
    site: [this.bookingInfo.room.site.id, Validators.required],
    room: [this.bookingInfo.room.id, Validators.required]
  })




  ngOnInit(): void {
    this.siteService.getSites().subscribe(sites =>{ this.sites = sites
    this.siteSelection(this.bookingInfo.room.site.id);
    this.roomSelection(this.bookingInfo.room.id);
     this.startValue=this.bookingInfo.startDate
     this.endValue= this.bookingInfo.endDate  
  });
  }


  siteSelection(index: any | number) {

    if ((typeof(index) !== 'number')) {
      index = parseInt(index.target.value, 10);
    }
    

    if (!isNaN(index)) {
      this.roomService.getRooms(index).subscribe(rooms => {
        this.rooms = rooms
        this.selectedDone = true;
      })
    }
  }



  roomSelection(index: any | number) {

    if ((typeof(index) !== 'number')) {
      index = parseInt(index.target.value, 10);
    }

    if (!isNaN(index)) {
      this.roomService.getRoomById(index).subscribe(room => {
        this.roomToAdd = room ;     
        this.firstSection() 
      });
      

    }
  }






  creaPrenotazione() {

    this.loading = true;


    this.toAdd = {
      startDate: this.booking.value.startDate,
      endDate: this.booking.value.endDate
    }

    this.bookingToAdd = {
      id: this.bookingInfo.id,
      title: this.booking.value.title,
      startDate: this.booking.value.startDate,
      endDate: this.booking.value.endDate,
      room: this.roomToAdd,
      user: this.defaultUser,
      numberOfParticipants: this.booking.value.numberOfParticipants,
      techNecessities: this.booking.value.techNecessities

    }

    this.bookingService.updateBooking(this.bookingToAdd).subscribe(response => {
      if(response) {
        this.loading = false;
        this.positiveResponse = true;

      } else {
        this.loading = false;
        this.negativeResponse = true;
      }
    })
     

  }






  firstSection() {

    this.bookingService.getBookingByRoomId(this.roomToAdd.id).subscribe(bookings => {
      this.forTry = bookings.filter(book=> book.id !== this.bookingInfo.id)
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



  confirm() {
    this.positiveResponse = true;
    this.booking.reset();
  }


  close() {
    this.negativeResponse = false;
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

    const startDate = moment(this.startValue);
    const endDate = moment(this.endValue);

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






