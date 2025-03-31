import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service'; // Importáld a CompanyService-t
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs'; // RxJS segédfüggvény a kombináláshoz

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  imports: [CommonModule],
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isLoggedIn = false;
  profilePic: string | null = null;

  constructor(
    private userService: UserService,
    private companyService: CompanyService // Injektáld a CompanyService-t
  ) {}

  ngOnInit(): void {
    this.profilePic = localStorage.getItem('profilePic') || null;
    console.log('Token:', localStorage.getItem('token'));
    console.log('UserId:', localStorage.getItem('userId'));
    console.log('CompanyId:', localStorage.getItem('companyId'));
  
    combineLatest([
      this.userService.isLoggedIn(),
      this.companyService.isLoggedIn()
    ]).subscribe(([userLoggedIn, companyLoggedIn]) => {
      this.isLoggedIn = userLoggedIn || companyLoggedIn;
      console.log('User Logged In:', userLoggedIn, 'Company Logged In:', companyLoggedIn);
    });
  }

  logout() {
    console.log('Logout called');
    if (localStorage.getItem('userId')) {
      this.userService.logout();
    } else if (localStorage.getItem('companyId')) {
      this.companyService.logout();
    }
    this.isLoggedIn = false;
    this.profilePic = null;
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