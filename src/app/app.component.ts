import { Component } from '@angular/core';
import {LocationService} from "../services/location service/location.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'advorater-main';

  constructor(private location:LocationService) {
    this.location.setLocation()
  }
}
