import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../config";


function _window(): any {
    return window;
}


@Injectable({
    providedIn: 'root'
})
export class PaymentServiceService {

  url = baseUrl

    get nativeWindow(): any {
        return _window();
    }


  newOrder(body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/new_order`, body)
  }

  paymentSuccess(body:any, id:any): Observable<any>{
    return this.httpClient.put<any>(`${this.url}/payments/${id}`, body)
  }


    constructor(private httpClient: HttpClient) {
    }
}
