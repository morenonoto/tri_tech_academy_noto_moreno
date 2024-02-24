import { Component, OnInit } from '@angular/core';
import { Room } from '../../interfaces/room';
import { RoomService } from '../../services/room.service';
import { MainService } from '../../services/main.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomService, private mainService: MainService){}


  rooms: Room [] = []


  ngOnInit(): void {
    let index = this.mainService.index === 0? Number(localStorage.getItem('indexSede')): this.mainService.index
    this.roomService.getRooms(index).subscribe(rooms => {
      this.rooms = rooms
    })
  }



  showBookings(id: number) {
    this.mainService.showBookings(id);
  }

  

}
