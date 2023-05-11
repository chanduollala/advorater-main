import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmailsenderService {

    constructor(private httpClient: HttpClient) {
    }

    sendEmail(ccemail: String, message: String, type: number, email: string, adv_id: number) {
        console.log("srnt")
        let s = this.httpClient.post(`http://localhost:8282/advorater/email/send/sendEmail/${ccemail}/${message}/${type}/${email}/${adv_id}`, {}).subscribe(
            response => {
                console.log(response)
            }
        )
        console.log(s)
    }

    sendContactEmail(email: string, message: string) {
        console.log(email, message)
        let s = this.httpClient.post(`http://localhost:8282/advorater/email/send/contactEmail/${email}/${message}`, {}).subscribe(
            response => {
                console.log(response)
            }
        )
    }

    verifyEmail(email: string, OTP: string) {
        console.log(email)
        this.httpClient.get(`http://localhost:3000/verify_email?otp=${OTP}&receiver_email=${email}`).subscribe(
            (response) => {
                console.log(response)
            }
        )

    }
}
