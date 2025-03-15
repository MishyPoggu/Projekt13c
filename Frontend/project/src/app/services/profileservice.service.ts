import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http"; 
import { Observable } from "rxjs";

@Injectable(
    {providedIn: 'root'}
)
export class ProfileService {
    private baseURL = 'http://localhost:3004/users/profile'

    constructor(private http: HttpClient) {}

    getUserProfile(): Observable<any> {
        return this.http.get<any>(this.baseURL);
    }

    updateUserProfile(profileData: any): Observable<any> {
        return this.http.put<any>(this.baseURL, profileData);
    }

}