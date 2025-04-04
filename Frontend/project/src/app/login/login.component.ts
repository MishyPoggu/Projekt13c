import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 
  errorMessage: string = ''; // Hibaüzenet
  successMessage: string = ''; 
  isCompanyLogin: boolean = true; // Céges vagy személyes bejelentkezés

  constructor(private formBuilder: FormBuilder, private userService: UserService, private companyService: CompanyService, 
private router: Router
  ) { // Űrlap inicializálása, és validátorok
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      taxNumber: ['', [Validators.required, Validators.pattern(/^\d{8}-\d{1}-\d{2}$/), Validators.maxLength(13)]], // Adószám helyes megadása
      passwordHash: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.toggleLoginType();
  }

  toggleLoginType(): void { // Céges vagy személyes bejelentkezés közötti váltás
    this.isCompanyLogin = !this.isCompanyLogin;
    this.loginForm.reset();

    if (this.isCompanyLogin) { // Céges bejelentkezési adatok
      this.loginForm.get('taxNumber')?.setValidators(Validators.required);
      this.loginForm.get('passwordHash')?.setValidators(Validators.required);
      this.loginForm.get('username')?.clearValidators();
    } else { // Személyes bejelentkezési adatok
      this.loginForm.get('taxNumber')?.clearValidators();
      this.loginForm.get('passwordHash')?.setValidators(Validators.required);
      this.loginForm.get('username')?.setValidators(Validators.required);
    }
    // Validációk frissítése 
    this.loginForm.get('taxNumber')?.updateValueAndValidity();
    this.loginForm.get('passwordHash')?.updateValueAndValidity();
    this.loginForm.get('username')?.updateValueAndValidity();
  }

  onTaxNumberInput(event: Event): void { // Adószám ellenőrzése és és formátum módosítása
    if (!this.isCompanyLogin) return;

    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10);
    }
    value = value.slice(0, 13);

    input.value = value;
    this.loginForm.get('taxNumber')?.setValue(value);
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    this.errorMessage = ''; 
    this.successMessage = '';

    if (this.loginForm.valid) { // Céges bejelentkezés
      const passwordHash = this.loginForm.value.passwordHash;
      if (this.isCompanyLogin) {
        const taxNumber = this.loginForm.value.taxNumber;
        this.companyService.login(taxNumber, passwordHash).subscribe({
          next: (res) => {
            this.successMessage = 'Sikeres céges bejelentkezés!';
            localStorage.setItem('companyId', res.companyId);
            this.companyService.saveToken(res.token);
            this.router.navigate(['/body']);
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = 'Hibás bejelentkezési adatok!';
          }
        });
      } else { // Személyes bejelentkezés
        const username = this.loginForm.value.username;
        this.userService.login(username, passwordHash).subscribe({
          next: (res) => {
            this.successMessage = 'Sikeres személyes bejelentkezés!';
            localStorage.setItem('userId', res.userId);
            this.userService.saveToken(res.token);
            this.router.navigate(['/body']);
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = 'Hibás bejelentkezési adatok!';
          }
        });
      }
    } else {
      this.errorMessage = 'Kérjük, töltse ki az összes kötelező mezőt helyesen!';
    }
  }
}
