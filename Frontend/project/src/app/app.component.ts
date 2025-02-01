import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { HeadComponent } from './head/head.component';  
import { BodyComponent } from './body/body.component';
import { ConsolesComponent } from './consoles/consoles.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeadComponent, RouterModule, BodyComponent, ConsolesComponent], 
})
export class AppComponent {
  title = 'project'; 
}
