import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../config";

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    url = baseUrl;

    constructor(private http: HttpClient) {
    }

    searchByNameCityTag(name: string, city_id: number, tag_id: number, offset: number, limit: number) {
        return this.http.get<any[]>(`${this.url}/search/nct?name=${name}&city_id=${city_id}&tag_id=${tag_id}&offset=${offset}&limit=${limit}`)
    }

    search(offset:number, limit: number){
      return this.http.get<any[]>(`${this.url}/search?offset=${offset}&limit=${limit}`)
    }

    searchByNameCity(name: string, city_id: number, offset: number, limit: number) {
        return this.http.get<any[]>(`${this.url}/search/nc?name=${name}&city_id=${city_id}&offset=${offset}&limit=${limit}`)
    }

    searchByNameTag(name: string, tag_id: number, offset: number, limit: number) {
        return this.http.get<any[]>(`${this.url}/search/nt?name=${name}&tag_id=${tag_id}&offset=${offset}&limit=${limit}`)
    }

    searchByTagCity(tag_id: number, city_id: number, offset: number, limit: number) {
        return this.http.get<any[]>(`${this.url}/search/tc?city_id=${city_id}&tag_id=${tag_id}&offset=${offset}&limit=${limit}`)
    }

  searchByName(name: string, offset: number, limit: number) {
    return this.http.get<any[]>(`${this.url}/search/n?name=${name}&offset=${offset}&limit=${limit}`)
  }
}
