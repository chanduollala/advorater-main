import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "./config";

@Injectable({
    providedIn: 'root'
})
export class AdminService {



    constructor(private httpClient: HttpClient) {
    }

    url = baseUrl


  getCity(id:number){
    return this.httpClient.get<any>(`${this.url}/cities/${id}`)
  }


    addCity(body: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/cities`, body)
    }

    getDocTypes():  Observable<any>{
      return this.httpClient.get<any>(`${this.url}/document_types`)
    }

    getCities(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/cities`)
    }

    getStates(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/states`)
    }

    updateCityOperationalStatus(id: number, status: boolean): Observable<any> {
        return this.httpClient.put<any>(`${this.url}/cities/${id}`, {is_operational: status})
    }


    addTag(body: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/tags`, body)
    }

    getTags(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/tags`)
    }

    getTagTypes(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/tag_types`)
    }

    getSpecializations(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/specializations`)
    }
}
