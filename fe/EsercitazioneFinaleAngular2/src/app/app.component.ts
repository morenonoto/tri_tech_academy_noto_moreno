import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { BookingsComponent } from '../components/bookings/bookings.component';
import { RoomsComponent } from '../components/rooms/rooms.component';
import { HttpClientModule } from '@angular/common/http';
import { SitesComponent } from '../components/sites/sites.component';
import { HomeComponent } from '../components/home/home.component';
import { AgendaComponent } from '../components/agenda/agenda.component';
import { BookingDetailComponent } from '../components/booking-detail/booking-detail.component';
import { EditorComponent } from '../components/editor/editor.component';
import { FormForAddingComponent } from '../components/form-for-adding/form-for-adding.component';
import { LoggerComponent } from '../components/logger/logger.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HttpClientModule, 
    HeaderComponent, 
    BookingsComponent, 
    RoomsComponent, 
    SitesComponent, 
    HomeComponent, 
    RouterOutlet, 
    AgendaComponent,
    BookingDetailComponent,
    EditorComponent,
    FormForAddingComponent,
    LoggerComponent
  ],
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EsercitazioneFinaleAngular';


  logged = true;
}
