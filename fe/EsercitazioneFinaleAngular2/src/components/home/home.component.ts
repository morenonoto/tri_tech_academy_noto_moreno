import { Component } from '@angular/core';
import { LoggerComponent } from '../logger/logger.component';
import { MainService } from '../../services/main.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoggerComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private mainService: MainService) {}

  get getMain():boolean {
    return this.mainService.getLoggedIn()
  }


  exit() {
    this.mainService.exit();
  }

}
