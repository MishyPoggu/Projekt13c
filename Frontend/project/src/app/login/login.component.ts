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
  errorMessage: string = '';
  successMessage: string = '';
  isCompanyLogin: boolean = true;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private companyService: CompanyService, 
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: [''], 
      taxNumber: [''], 
      passwordHash: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.toggleLoginType();
  }

  toggleLoginType(): void {
    this.isCompanyLogin = !this.isCompanyLogin;

    if (this.isCompanyLogin) {
      this.loginForm.get('taxNumber')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{8}-\d{1}-\d{2}$/),
        Validators.maxLength(13)
      ]);
      this.loginForm.get('username')?.clearValidators();
    } else {
      this.loginForm.get('username')?.setValidators(Validators.required);
      this.loginForm.get('taxNumber')?.clearValidators();
    }

    this.loginForm.get('taxNumber')?.updateValueAndValidity();
    this.loginForm.get('username')?.updateValueAndValidity();
    this.loginForm.get('passwordHash')?.updateValueAndValidity();
  }

  onTaxNumberInput(event: Event): void {
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

    if (this.loginForm.valid) {
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
      } else {
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
