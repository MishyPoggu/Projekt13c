import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn() {
      throw new Error('Method not implemented.');
  }
  private baseURL = "http://localhost:3004/users";
  router: any;



  constructor(private http: HttpClient ) { }

  register(user: any): Observable<any> {
    return this.http.put(`${this.baseURL}/register`, user);

  }

  login(username: string, passwordHash: string): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, { username, passwordHash });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
}
