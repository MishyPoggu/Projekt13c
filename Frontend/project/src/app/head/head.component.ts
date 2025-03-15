import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  imports: [CommonModule],
  styleUrls: ['./head.component.css']
})
export class HeadComponent {
  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout(); 
  }

  isMenuOpen = false; 
  isUserDropdownOpen = false; 
  isLoggedIn = false; 

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }
}
