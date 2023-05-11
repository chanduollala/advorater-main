import {Component, OnInit, Output, EventEmitter, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {Observable} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {LocationService} from "../../services/location service/location.service";
// import {LoginDialogComponent} from "../login-dialog/login-dialog.component";


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
    animal!: string;
    name!: string;
    menuItems = [
        {label: 'Find Advocates', route: 'advorater/find-advocates'},
        {label: 'Latest Legal News', route: 'advorater/latest-legal-news'},
        {label: 'About Us', route: 'advorater/about-us'},
        {label: 'Contact Us', route: 'advorater/contact-us'}
    ]

    isLoggedIn: boolean = false;
    city  : any
    constructor(public dialog: MatDialog, private adminService: AdminService, private locationService: LocationService) {

      this.isLoggedIn = (sessionStorage.getItem('login_status')=='Yes')



      locationService.city_value.subscribe(
        (value)=>{
          this.adminService.getCity(Number.parseInt(value!)).subscribe((res)=>{
            this.city=res
          })
        }
      )


    }







  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
          width: '450px',
          data: {name: this.name, animal: this.animal},
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
      });
  }
}

