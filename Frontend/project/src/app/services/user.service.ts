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

  constructor(private http: HttpClient, private router: Router) { 
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
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false); 
    this.router.navigate(['/login']);
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/get`, {
      params: { userId: userId.toString() }
    });
  }

  saveProfile(userId: number, name?: string, age?: number, phoneNumber?: string, profilePic?: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/profile`, {
      userId,
      name,
      age,
      phoneNumber,
      profilePic
    });
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