import { Component } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  isMenuOpen = false;
  isUserDropdownOpen = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    toggleUserDropdown() {
        this.isUserDropdownOpen = !this.isUserDropdownOpen;
    }
}