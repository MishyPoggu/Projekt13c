import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.loginForm.reset()
    this.loginForm.markAllAsTouched(); 
    this.loginForm.get('hitelesitő')?.setValidators(Validators.required);
    this.loginForm.get('passwordHash')?.setValidators(Validators.required);
    this.loginForm.get('hitelesitő')?.updateValueAndValidity();
    this.loginForm.get('passwordHash')?.updateValueAndValidity();
  }

    onSubmit(): void {
      this.errorMessage = ''; 
      this.successMessage = '';

      if (this.loginForm.valid) {
        let { hitelesitő, passwordHash } = this.loginForm.value;

        const loginData = this.isCompanyLogin 
      ? { taxNumber: hitelesitő, passwordHash }  // Ha cég loginol akkor az adószám lesz a "hitelesítő amugy meg a felhasználónév."
      : { username: hitelesitő, passwordHash };


        if (this.isCompanyLogin) {
          hitelesitő = this.loginForm.value.taxNumber;
        } else {
          hitelesitő = this.loginForm.value.username;
        }
        
        console.log('Belépési próbálkozás', this.loginForm.value);

        const loginService = this.isCompanyLogin ? this.companyService : this.userService;

        loginService.login(hitelesitő, passwordHash).subscribe({
          next: (res) => {
            if (this.isCompanyLogin){
              localStorage.setItem('companyId', res.companyId);
              console.log('Sikeresen bejelentkezett cégként', res.companyId);
              this.companyService.saveToken(res.token);
            }else {
              localStorage.setItem("userId", res.userId);
              console.log('Sikeres személyes bejelentkezés', res.userId);
              this.userService.saveToken(res.token);
            }
            this.successMessage = 'Sikeres bejelentkezés!';
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
