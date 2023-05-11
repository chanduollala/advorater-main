import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UpdateService {

    constructor(private httpClient: HttpClient) {
    }

    private baseURL = "http://localhost:8282/user";

    update(usertype: string, username: string, field: string, updated_value: string): Observable<any> {

        const body = new FormData();
        body.append('role', usertype);
        body.append('username', username);
        body.append('field', field);
        body.append('value', updated_value)

        let s = this.httpClient.post<any>(`${this.baseURL}/update/`, body);
        return s
    }

    addCity(city: string, state: string) {
        const body = new FormData();
        body.append('city', city);
        body.append('state', state);

        let s = this.httpClient.post<any>(`${this.baseURL}/add-city/`, body);
        console.log(s.subscribe())
        window.location.reload()
        return s
    }

    addTag(tag: string, type: string) {
        const body = new FormData();
        body.append('tag', tag);
        body.append('type', type);

        let s = this.httpClient.post<any>(`${this.baseURL}/add-tag/`, body);
        console.log(s.subscribe())
        window.location.reload()
        return s
    }
}
