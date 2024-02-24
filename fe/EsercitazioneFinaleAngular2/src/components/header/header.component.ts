import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainService } from '../../services/main.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileExport, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from '../../services/booking.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule, MatProgressSpinnerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private mainService: MainService, private bookingService: BookingService) { }

  faFileExport = faFileExport;
  faFileArrowDown = faFileArrowDown;
  loading = false;

  get getMain() {
    return this.mainService.getLoggedIn();
  }



  exportCsv() {
    this.loading = true;
    this.bookingService.exportCsv().subscribe({
      next: response => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'BookingReport.csv');
        document.body.appendChild(link);
        link.click();
        this.loading = false;
      },
      error: error => {
        console.error('Error exporting CSV:', error);
        this.loading = false;

      }
    });
  }

  
}
