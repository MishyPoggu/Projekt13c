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

  constructor(private http: HttpClient, private router: Router) { 
    this.router = router; 
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated()); 

  isLoggedIn() {
      return this.isLoggedInSubject.asObservable(); 
  }


  register(company: any): Observable<any> {
    return this.http.put(`${this.baseURL}/register`, company);
  }

  login(taxNumber: string, passwordHash: string): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, { taxNumber, passwordHash });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('companyId');
    this.isLoggedInSubject.next(false); 
    this.router.navigate(['/login']);
  }

  getCompanyProfile(companyId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${companyId}`);
  }
  
  saveCompanyProfile(companyId: number, registrationNumber: string, contactPerson: string, websiteUrl: string): Observable<any> {
    return this.http.post(`${this.baseURL}/update`, {
      companyId,
      registrationNumber,
      contactPerson,
      websiteUrl
    });
  }
  

  saveToken(token: string, companyId?: string): void { 
    this.isLoggedInSubject.next(true) ; 
    localStorage.setItem('token', token);
    
    if (companyId) {
      localStorage.setItem('companyId', companyId);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
      return !!this.getToken() && !!localStorage.getItem('companyId');
  }
}
