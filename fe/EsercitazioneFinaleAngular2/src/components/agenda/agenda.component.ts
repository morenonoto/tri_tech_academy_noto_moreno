import { Component, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import moment from 'moment';
import { BookingsComponent } from '../bookings/bookings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MainService } from '../../services/main.service';
import { RouterLink } from '@angular/router';
import { faAngleRight, faAngleLeft, faCalendarDays, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-agenda',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FontAwesomeModule, BookingsComponent, MatFormFieldModule, MatDatepickerModule, CommonModule, MatInputModule, RouterLink],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {

  constructor(private mainService: MainService) { }

  @ViewChild('picker') picker!: MatDatepicker<Date>
  @ViewChild('newDate') newDate!: ElementRef<HTMLInputElement>


  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faCalendarDays = faCalendarDays;
  faFileCirclePlus = faFileCirclePlus;

  currentDate = moment()

  choose = true;


  today = moment().subtract(1, 'day').endOf('day');



  nextDay() {
    this.currentDate.add(1, 'days');
  }


  previousDay() {
    this.currentDate.subtract(1, 'days');
  }


  chooseData() {
    this.choose = false;

    setTimeout(() => this.picker.open(), 50)

  }



  changeData() {
    this.currentDate = moment(this.newDate.nativeElement.value)
    this.choose = true;
  }


  addingPost() {
    this.mainService.adding(this.currentDate);
  }
}
