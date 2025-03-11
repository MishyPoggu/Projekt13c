import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArcadeService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:3000/arcade/";
  pinballURL = "http://localhost:3000/pinball/";
  consoleURL = "http://localhost:3000/consoles/";

  getAllArcade() {
    return this.http.get(this.baseURL);
  }

  getAllPinballMachines() {
    return this.http.get(this.pinballURL);
  }

  getAllConsole() {
    return this.http.get(this.consoleURL);
  }
}
