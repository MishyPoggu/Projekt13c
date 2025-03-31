import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Arcade } from '../arcade';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:3004/users";

  constructor(private http: HttpClient, private router: Router) { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  register(user: any): Observable<any> {
    return this.http.put(`${this.baseURL}/register`, user);
  }

  login(username: string, passwordHash: string): Observable<any> {
    localStorage.removeItem('companyId');
    localStorage.removeItem('token');
    return this.http.post(`${this.baseURL}/login`, { username, passwordHash });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUserProfile(userID: number): Observable<any> {
    return this.http.get(`${this.baseURL}`, {
      params: { userId: userID.toString() }
    });
  }

  saveProfile(
    userId: number,
    name?: string,
    age?: number,
    phoneNumber?: string,
    profilePic?: string,
    username?: string, // Bár nem használjuk az űrlapon, a definícióban marad
    email?: string     // Bár nem használjuk az űrlapon, a definícióban marad
  ): Observable<any> {
    const updateData: any = { userId };
    if (name !== undefined) updateData.name = name;
    if (age !== undefined) updateData.age = age;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (profilePic !== undefined) updateData.profilePic = profilePic;
    // A username és email nem kerül frissítésre az űrlapról
    return this.http.post(`${this.baseURL}/update`, updateData);
  }

  saveToken(token: string) {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!localStorage.getItem('userId');
  }

  getUserMachines(userID: number) {
    return this.http.get(`${this.baseURL}/machines/${userID}`);
  }

  addMachineToUser(machine: Arcade, machineType: string) {
    const data = {
      userId: Number(localStorage.getItem("userId")),
      name: machine.name,
      machineType: machineType
    };
    console.log(data);
    return this.http.post(`${this.baseURL}/machines/add`, data);
  }

  removeMachineFromUser(machine: Arcade, machineType: string) {
    const data = {
      userId: Number(localStorage.getItem("userId")),
      name: machine.name,
      machineType: machineType
    };
    console.log(data);
    return this.http.delete(`${this.baseURL}/machines/remove`, { body: data });
  }
}