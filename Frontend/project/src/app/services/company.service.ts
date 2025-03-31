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

  constructor(private http: HttpClient, private router: Router) { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  register(company: any): Observable<any> {
    return this.http.put(`${this.baseURL}/register`, company);
  }

  login(taxNumber: string, passwordHash: string): Observable<any> {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return this.http.post(`${this.baseURL}/login`, { taxNumber, passwordHash });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('companyId');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCompanyProfile(companyId: number): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  saveCompanyProfile(
    companyId: number,
    registrationNumber?: string,
    contactPerson?: string,
    websiteUrl?: string,
    companyName?: string, // Bár nem használjuk az űrlapon, a definícióban marad
    taxNumber?: string,   // Bár nem használjuk az űrlapon, a definícióban marad
    contactEmail?: string // Bár nem használjuk az űrlapon, a definícióban marad
  ): Observable<any> {
    const updateData: any = { companyId };
    if (registrationNumber !== undefined) updateData.registrationNumber = registrationNumber;
    if (contactPerson !== undefined) updateData.contactPerson = contactPerson;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl;
    // A companyName, taxNumber és contactEmail nem kerül frissítésre az űrlapról
    return this.http.post(`${this.baseURL}/update`, updateData);
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  saveToken(token: string, companyId?: string): void {
    this.isLoggedInSubject.next(true);
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