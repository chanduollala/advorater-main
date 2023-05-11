import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";
import {LocationService} from "../../services/location service/location.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private adminService:AdminService, private router: Router, private locationService: LocationService) {

  }

  city!: string

  cities: string[] = [];
  specs: any[] = [];
  ngOnInit(): void {
    this.adminService.getCities().subscribe(
      response => {
        for (let data in response) {
          if(response[data].id==Number.parseInt(sessionStorage.getItem('city_id')!)){
            this.city = response[data].city_name
            console.log(this.city)
          }

          // @ts-ignore
          this.cities.push(response[data])
        }
      }
    );

    this.adminService.getSpecializations().subscribe(response => {
      for (let data in response) {
        // @ts-ignore
        this.specs.push(response[data])
      }
      console.log(this.specs)
    })
  }


  searchSpec(spec: string) {
    this.router.navigate([`/search/${spec}`])
  }


}
