import { Component, OnInit } from '@angular/core';
import { Site } from '../../interfaces/site';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MainService } from '../../services/main.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css'
})
export class SitesComponent implements OnInit{

  constructor(private siteService: SiteService, private mainService: MainService){}

  sites: Site [] = [];



  ngOnInit(): void {
    this.siteService.getSites().subscribe(sites => {
      this.sites = sites
    })
  }


  showRooms(i: number){
    this.mainService.showRooms(i);
  }
  

}
