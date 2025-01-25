import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { HeadComponent } from './head/head.component';  
import { JatekteremFeltoltesComponent } from './jatekterem-feltolt/jatekterem-feltolt.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeadComponent, RouterModule, JatekteremFeltoltesComponent], 
})
export class AppComponent {
  title = 'project'; 
}
