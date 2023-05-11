import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieOptions, CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {baseUrl} from "../config";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = baseUrl;
  private retrieveResonse: any;
  private base64Data: any;
  private retrievedImage!: string;
  private hi!: string;

  constructor(private httpClient: HttpClient,  private cookie: CookieService,private router: Router, private snackBar: MatSnackBar) {


  }

  login(email: any, password: any): Observable<any> {
    console.log("login attempt")

    let s = this.httpClient.get<any>(`${this.url}/login/`, {params: {"username": email, "password_digest": password}});
    console.log(s)
    return s
  }


  initiateLogin(username: string, password: string): any {
    this.login(username, password).subscribe(
        async response => {
          console.log(response)
          if (response == null) {
              this.snackBar.open("User does not exist. Check your email address or Signup", "SIGNUP");
          } else {
              this.cookie.set('username', username, 30)
              sessionStorage.setItem('username', response.username)
              this.cookie.set('password', password)

              sessionStorage.setItem('user_id', response.id)
              sessionStorage.setItem('user_detail_id', response.user_detail_id)
              if (response.user_detail) {
                  sessionStorage.setItem('address_id', response.user_detail.address_id)
                  sessionStorage.setItem('contact_detail_id', response.user_detail.contact_detail_id)
                  sessionStorage.setItem('name_id', response.user_detail.name_id)
              }
              sessionStorage.setItem('login_status', 'Yes')
              sessionStorage.setItem('user_type', response.user_type)
              sessionStorage.setItem('login_data', response)
              window.location.reload()
          }
        },
        error => {
          console.log("error while signing up user");
        }
    );
  }





}

