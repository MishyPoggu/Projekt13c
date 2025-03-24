import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Environment } from '../environment';

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
  isCompanyLogin: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private userService: UserService, private companyService: CompanyService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      hitelesitő: ['', Validators.required], // Cégek esetében ez az adószám lesz és személyeknél a felhasználó név.
      passwordHash: ['', Validators.required]
    });
  }  

  ngOnInit(): void {}

  toggleLoginType(): void {
    this.isCompanyLogin = !this.isCompanyLogin;
    this.loginForm.get('hitelesitő')?.setValidators(Validators.required);
    this.loginForm.get('passwordHash')?.setValidators(Validators.required);
    this.loginForm.get('hitelesitő')?.updateValueAndValidity();
    this.loginForm.get('passwordHash')?.updateValueAndValidity();
  }

  onSubmit(): void {
    this.errorMessage = ''; 
    this.successMessage = '';

    if (this.loginForm.valid) {
      const { hitelesitő, passwordHash } = this.loginForm.value;
      console.log('Belépési próbálkozás', this.loginForm.value);

      const loginService = this.isCompanyLogin ? this.companyService : this.userService;

      this.userService.login(hitelesitő, passwordHash).subscribe({
        next: (res) => {
           Environment.userId = res.userId;
          console.log(Environment.userId);
          localStorage.setItem("userId", res.userId);
          this.successMessage = 'Sikeres bejelentkezés!';
          console.log('Login successful', res);
          this.userService.saveToken(res.token);
          this.router.navigate(['/body']);

         
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = 'A bejelentkezési adatok hibásan lettek megadva!';
          console.log('Login failed: ', err.message);

        }
      });
    }
  }
}
