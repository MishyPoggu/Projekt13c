import { Component } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
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
