import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { CompanyService } from './companies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router // Győződj meg róla, hogy itt van
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.userService.isAuthenticated() || this.companyService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Itt használjuk a navigate metódust
    }
    return isAuthenticated;
  }
}