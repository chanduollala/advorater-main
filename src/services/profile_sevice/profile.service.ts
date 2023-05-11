import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../config";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    url = baseUrl

    constructor(private httpClient: HttpClient,private cookie: CookieService,private router: Router,) {
    }

    loadCustomer(id: number): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/users/${id}`)
    }

    loadAdvocateForProfile(user_id: number) {
        return this.httpClient.get<any>(`${this.url}/adv_user/${user_id}`)
    }

  getCustomerInteractions(user_id: number){
    return this.httpClient.get<any>(`${this.url}/user_interactions?user_id=${user_id}`);
  }

  async logout() {
    sessionStorage.clear()
    sessionStorage.setItem('loginstatus', 'No')
    this.cookie.deleteAll()
    this.router.navigate(['/home']).then(()=>{
        window.location.reload()
    }

    )
  }

  getAdvocateInteractions(advocate_id: number) {
    return this.httpClient.get<any>(`${this.url}/user_interactions?advocate_id=${advocate_id}`);
  }
}
