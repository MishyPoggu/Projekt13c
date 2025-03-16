import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:3004/users";
  private router: Router; 

  constructor(private http: HttpClient, router: Router) { 
    this.router = router; 
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated()); 

  isLoggedIn() {
      return this.isLoggedInSubject.asObservable(); 
  }


  register(user: any): Observable<any> {
    return this.http.put(`${this.baseURL}/register`, user);
  }

  login(username: string, passwordHash: string): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, { username, passwordHash });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false); 
    this.router.navigate(['/login']);
  }


  saveToken(token: string) { 
    this.isLoggedInSubject.next(true); 

    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
