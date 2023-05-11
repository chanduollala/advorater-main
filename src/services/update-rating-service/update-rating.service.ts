import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UpdateRatingService {

    constructor(private httpClient: HttpClient) {
    }

    private baseURL = "http://localhost:8282/advorater/user";

    updateRating(rating: number, feedback: string, id: number): Observable<any> {
        console.log("service")
        return this.httpClient.post(`${this.baseURL}/updaterating/${rating}/${feedback}/${id}`, {});
    }
}
