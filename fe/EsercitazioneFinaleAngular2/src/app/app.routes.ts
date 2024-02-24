import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { SitesComponent } from '../components/sites/sites.component';
import { RoomsComponent } from '../components/rooms/rooms.component';
import { BookingsComponent } from '../components/bookings/bookings.component';
import { AgendaComponent } from '../components/agenda/agenda.component';
import { BookingDetailComponent } from '../components/booking-detail/booking-detail.component';
import { EditorComponent } from '../components/editor/editor.component';
import { FormForAddingComponent } from '../components/form-for-adding/form-for-adding.component';
import { AuthGuard } from '../guard/auth.guard';



export const routes: Routes = [
   
    {path: 'sites', component: SitesComponent , canActivate: [AuthGuard]},
    {path: 'room', component: RoomsComponent , canActivate: [AuthGuard]},
    {path: 'agenda', component: AgendaComponent , canActivate: [AuthGuard]},
    {path: 'bookings', component: BookingsComponent , canActivate: [AuthGuard]},
    {path: 'agenda/bookingDetail', component: BookingDetailComponent , canActivate: [AuthGuard]},
    {path: 'agenda/bookingDetail/editor', component: EditorComponent , canActivate: [AuthGuard]},
    {path: 'formForAdding', component: FormForAddingComponent , canActivate: [AuthGuard]},

    
    {path: '', component: HomeComponent },
    {path:'**', component: HomeComponent},

];
