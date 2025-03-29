import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  imports: [CommonModule],
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isLoggedIn = false; 
  profilePic: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profilePic = localStorage.getItem('profilePic') || null;

    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.userService.logout(); 
    this.isLoggedIn = false;
  }

  isMenuOpen = false; 
  isUserDropdownOpen = false; 

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }
}
