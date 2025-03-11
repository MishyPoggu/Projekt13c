import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArcadeService {

  constructor(private http:HttpClient) { }


  baseURL = "http://localhost:3000/arcade/"
  getAllArcade() {
    return this.http.get(this.baseURL);
  }
}
