import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from "../config";

@Injectable({
    providedIn: 'root'
})

export class SignupService {

    constructor(private httpClient: HttpClient) {
    }

    url = baseUrl

    getAdvocate1(id:string){
      return this.httpClient.get<any>(`${this.url}/advocate_flash/${id}`)
    }

    newCustomer(body: any): Observable<any> {

        return this.httpClient.post<any>(`${this.url}/users`, body)
    }

    newAdvocateStep1(body: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/advocates`, body)
    }

    getTags() {
        return this.httpClient.get<any>(`${this.url}/tags`);
    }



    newAdvocateStep2(body: any, id:string): Observable<any> {
        return this.httpClient.put<any>(`${this.url}/advocates/${id}`, body)
    }

    loadPendingApprovals(): Observable<any[]> {
        return this.httpClient.get<any>(`${this.url}/pending_advocates/`)
    }

    viewApplication(id: string) {
        return this.httpClient.get<any>(`${this.url}/advocate_detail/${id}`)
    }


    approve(id: number) {
        return this.httpClient.put<any>(`${this.url}/advocates/${id}`, {is_verified: true})
    }


    saveBarRegProof(email: any, selectedFile: File) {
        console.log(selectedFile);

        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', selectedFile, email);
        uploadImageData.append('email', email)

        //Make a call to the Spring Boot RegistrationForm to save the image
        this.httpClient.post('http://localhost:8282/advocate/barproof/upload', uploadImageData, {observe: 'response'})
            .subscribe((response) => {
                    if (response.status === 200 || response.status === 406) {
                        console.log('Bar Proof updated success')
                    } else {
                        console.log('Bar Proof update failed')
                    }
                }
            );
    }

    saveIdProof(email: any, selectedFile: File) {
        console.log(selectedFile);

        //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', selectedFile, email);
        uploadImageData.append('email', email)

        //Make a call to the Spring Boot RegistrationForm to save the image
        this.httpClient.post('http://localhost:8282/advocate/idproof/upload', uploadImageData, {observe: 'response'})
            .subscribe((response) => {
                    if (response.status === 200) {
                        console.log('IdProof updated success')
                    } else {
                        console.log('IdProof update failed')
                    }
                }
            );
    }

    saveTags(email: string, tags: string[], courts: string[]) {
        this.httpClient.post<any>(`${this.url}/new/tags/?email=${email}&tag1=${tags[0]}&tag2=${tags[1]}&tag3=${tags[2]}&court1=${courts[0]}&court2=${courts[1]}`, {})
            .subscribe((response) => {
                    if (response.status === 200) {
                        console.log('Tags updated success')
                    } else {
                        console.log('Tags update failed')
                    }
                }
            );
        console.log("hiii")
    }




    decline(email: string, approvedby: string) {
        let response = this.httpClient.get<any>(`${this.url}/verify/decline/?email=${email}&approvedBy=${approvedby}`);
        console.log(response.subscribe())
        return response
    }


}
