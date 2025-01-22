import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const appRoutes: Routes = [
  { path: '', component: BodyComponent }, // Főoldal
  { path: 'home', component: BodyComponent }, // Főoldal - ugyanaz a BodyComponent
  { path: 'login', component: LoginComponent }, // Bejelentkezés
  { path: 'register', component: RegisterComponent }, // Regisztráció
  { path: '**', redirectTo: '' } // 404-es oldal, ha nem létezik az útvonal
];
