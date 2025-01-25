import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  imports: [CommonModule] 
})
export class HeadComponent {
  showAuthMenu: boolean = false;

  toggleAuthMenu() {
    this.showAuthMenu = !this.showAuthMenu;
  }

  bejelentkezes() {
    console.log('Bejelentkezés');
  }

  regisztracio() {
    console.log('Regisztráció');
  }
}
