import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseURL = "http://localhost:3004/companies";
  private router: Router; 

  constructor(private http: HttpClient, router: Router) { 
    this.router = router; 
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated()); 

  isLoggedIn() {
      return this.isLoggedInSubject.asObservable(); 
  }


  register(company: any): Observable<any> {
    return this.http.put(`${this.baseURL}/register`, company);
  }

  login(username: string, passwordHash: string): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, { username, passwordHash });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('companyId');
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
