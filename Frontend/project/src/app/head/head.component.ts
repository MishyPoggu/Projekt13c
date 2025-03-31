import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  imports:[CommonModule],
})
export class HeadComponent implements OnInit {
  isMenuOpen: boolean = false;
  isUserDropdownOpen: boolean = false;
  isLoggedIn: boolean = false;
  profilePic: string | null = null;
  isCompanyLogin: boolean = false;

  constructor(
    private userService: UserService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadProfile();
    // Feliratkozunk a bejelentkezési állapot változására
    this.userService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      if (status) this.loadProfile();
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  checkLoginStatus() {
    this.isLoggedIn = this.userService.isAuthenticated() || !!localStorage.getItem('companyId');
    this.isCompanyLogin = !!localStorage.getItem('companyId');
  }

  loadProfile() {
    const userId = Number(localStorage.getItem('userId'));
    const companyId = Number(localStorage.getItem('companyId'));

    if (companyId) {
      this.isCompanyLogin = true;
      this.profilePic = null; // Céges esetben nincs profilkép, ikon lesz
      this.companyService.getCompanyProfile(companyId).subscribe({
        next: (response) => {
          if (response && response.data) {
            const profile = Array.isArray(response.data)
              ? response.data.find((item: any) => item.companyId === companyId)
              : response.data;
            if (profile) {
              // Nem állítunk be profilePic-et, mert céges ikon lesz
            }
          }
        },
        error: (err) => console.error('Hiba a céges profil betöltésekor:', err)
      });
    } else if (userId) {
      this.isCompanyLogin = false;
      this.userService.getUserProfile(userId).subscribe({
        next: (response) => {
          if (response && response.data) {
            const profile = Array.isArray(response.data)
              ? response.data.find((item: any) => item.userId === userId)
              : response.data;
            if (profile) {
              this.profilePic = profile.profilePic || null;
            }
          }
        },
        error: (err) => console.error('Hiba a felhasználói profil betöltésekor:', err)
      });
    }
  }

  logout() {
    if (this.isCompanyLogin) {
      this.companyService.logout();
    } else {
      this.userService.logout();
    }
    this.isLoggedIn = false;
    this.profilePic = null;
    this.isCompanyLogin = false;
    this.isUserDropdownOpen = false;
  }
}