import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../interfaces/booking';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { Router, RouterLink } from '@angular/router';
import { faPenToSquare, faTrashCan, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent implements OnInit {

  constructor(private bookingService: BookingService, private mainService: MainService, private router: Router) { }

  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faCircleXmark = faCircleXmark;


  booking!: Booking;
  beginningDate!: string;
  endDate!: string;
  deleted = false;
  deleting = false;
  isAuthorized:boolean= false

  ngOnInit(): void {
    this.bookingService.getBookingById(this.mainService.detailBookingIndex).subscribe(booking => {
      this.booking = booking;
      const loggedUser = this.mainService.getUser() as User
      if (loggedUser.role=== 'Admin') {
        this.isAuthorized=true
      }else{
       if (this.booking.user.email === loggedUser.email) this.isAuthorized= true 
       else this.isAuthorized = false;
      }
      this.dataFormatter();
    });
  }



  dataFormatter() {
    if (this.booking) {
      this.beginningDate = moment(this.booking.startDate).format('DD-MM-YYYY HH:mm');
      this.endDate = moment(this.booking.endDate).format('DD-MM-YYYY HH:mm');
    }
  }



  bookingDelete() {
    this.deleting = true;
  }

  confirmDelete(id: number) {
    this.bookingService.toFilter = id;
    this.bookingService.deleteBookingById(id).subscribe(() => {
      this.deleting = false;
      this.deleted = true;
    })
  }


  cancel() {
    this.deleting = false;
  }


  close() {
    this.deleted = false;
    this.router.navigate(['/agenda']);
  }


  bookingUpdate() {
    this.mainService.toUpdate(this.booking)
  }


  closeDetail(){
    this.router.navigate(['/agenda'])
  }

}
