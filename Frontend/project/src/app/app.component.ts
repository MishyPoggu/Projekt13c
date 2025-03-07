import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { HeadComponent } from './head/head.component'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeadComponent, RouterModule,], 
})
export class AppComponent {
  title = 'project'; 
}
