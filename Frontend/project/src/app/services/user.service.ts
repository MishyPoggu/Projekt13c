import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:3000/user/login";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseURL, { username, password });

  }

  register(user: any): Observable<any> {
    return this.http.post(this.baseURL + "user/register", user);
  }
}
