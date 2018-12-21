import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Awesome} from './awesome';

@Injectable({
    providedIn: 'root'
})
export class AwesomeService {
    private readonly API_URL = 'http://localhost:3000/awesomes';

    constructor(private http: HttpClient) {
    }

    getAwesomes(): Observable<Awesome[]> {
        return this.http.get<Awesome[]>(this.API_URL);
    }

    deleteAwesomes(id: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/${id}`);
    }

    createAwesome(awesome: Partial<Awesome>): Observable<Awesome> {
        return this.http.post<Awesome>(this.API_URL, awesome);
    }
}
