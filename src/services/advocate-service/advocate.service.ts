import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from "../config";


@Injectable({
    providedIn: 'root'
})

export class AdvocateService {

    private url = baseUrl;

    constructor(private httpClient: HttpClient) {
    }


    getAdvocateDetail(id: any): Observable<any> {
      return this.httpClient.get<any>(`${this.url}/advocate_detail/${id}`);
    }


    newInteraction(body: any){
      return this.httpClient.post<any>(`${this.url}/advocate_customer_interactions`, body);
    }

    getInteractions(advocate_id: number, user_id: number){
      return this.httpClient.get<any>(`${this.url}/advocate_customer_interactions/${advocate_id}?user_id=${user_id}`);
    }


    // getUsers(email: string): Observable<number> {
    //     let s = this.httpClient.get<number>(`${this.baseURL}/checkEmail/${email}`);
    //     console.log(s);
    //     return s;
    // }

    // getAdvocatesList(name: any, city: any, specialization: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.baseURL}/home/search/?name=${name}&city=${city}&specialization=${specialization}&sortingOrder=ascending`);
    // }

    // getIdfromPhone(phone: string): Observable<any> {
    //     return this.httpClient.get<any>(`${this.baseURL}/${phone}`);
    // }

    // getInteractions(email: any): Observable<any> {
    //     return this.httpClient.get<any>(`${this.baseURL}/interactions/${email}`);
    // }
    //
    // getInteractionsAdvocate(email: string): Observable<any> {
    //     return this.httpClient.get<any>(`${this.baseURL}/interactions/advocate/${email}`);
    // }
    //
    // getAdvEmail(name: string): Observable<any> {
    //     return this.httpClient.get<any>(`${this.baseURL}/advocate/email/${name}`);
    // }
    //
    // getAdvocateDetails(adv_cust_id: number): Observable<any> {
    //     return this.httpClient.get(`${this.baseURL}/specificadv/${adv_cust_id}`);
    // }
    //
    // getTags(id: number): Observable<any> {
    //     return this.httpClient.get(`${this.baseURL}/gettags/${id}`);
    // }
    //
    // getSpecializations(): Observable<any> {
    //     return this.httpClient.get<any>(`http://localhost:8282/advorater/advocate/specializations`);
    // }


}
