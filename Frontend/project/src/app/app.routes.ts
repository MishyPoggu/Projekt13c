import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JatekteremFeltoltesComponent } from './jatekterem-feltolt/jatekterem-feltolt.component'; 

export const appRoutes: Routes = [
  { path: '', component: BodyComponent },  
  { path: 'home', component: BodyComponent },  
  { path: 'login', component: LoginComponent },  
  { path: 'register', component: RegisterComponent },  
  { path: 'upload', component: JatekteremFeltoltesComponent },  
  { path: '**', redirectTo: '' }  
];
