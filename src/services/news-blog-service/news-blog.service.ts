import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Blog} from "../../model/Blog/blog";

@Injectable({
    providedIn: 'root'
})
export class NewsBlogService {

    private baseURL = "http://localhost:8282/advorater/newsblogtags/blogtags";

    constructor(private httpClient: HttpClient) {
    }

    getBlogList(): Observable<Blog[]> {
        return this.httpClient.get<Blog[]>(`${this.baseURL}`);
    }

    createBlog(blog: Blog): Observable<Object> {
        return this.httpClient.post(`${this.baseURL}`, blog);
    }

    getBlogs(id: number): any {
        let s = this.httpClient.get(`http://localhost:8282/advorater/newsblogtags/blogtags/${id}`, {responseType: 'text'});
        console.log(s);
        return s;
    }

    getNewsBlogs(): Observable<any> {
        return this.httpClient.get(`http://localhost:8282/advorater/newsblogs/blogs`);
    }

    getBlogswithImages(): Observable<any> {
        return this.httpClient.get(`http://localhost:8282/advorater/newsblogs/blogswithimages`);
    }

    deleteBlog(id: number): Observable<any> {
        return this.httpClient.get(`http://localhost:8282/advorater/newsblogs/delete/${id}`);
    }

    updateBlog(id: number, blog: Blog) {
        return this.httpClient.put(`http://localhost:8282/advorater/newsblogs/updateBlog/${id}`, blog);
    }
}
