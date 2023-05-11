import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../config";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url = baseUrl

  constructor(private http: HttpClient, ) { }

  geolocation(latitude: string, longitude: string){
    return this.http.get<any>(`${this.url}/geocode?latitude=${latitude}&longitude=${longitude}`)
  }

  getCity(id:number){
    return this.http.get<any>(`${this.url}/cities/${id}`)
  }


  city_value = new BehaviorSubject(this.city);

  set city(value){
    this.city_value.next(value); // this will make sure to tell every subscriber about the change.
    sessionStorage.setItem('city_id', value!);
  }

  get city() {
    return sessionStorage.getItem('city_id');
  }

  async setLocation() {
    var city_id: any
    if(sessionStorage.getItem('city_id')==null){
      await navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        this.geolocation(position.coords.latitude.toString(), position.coords.longitude.toString()).subscribe(
          (response) => {
            city_id = response.id
            this.city = city_id
          }
        )
      });
    }
    return this.getCity(Number.parseInt(city_id))
  }


}
