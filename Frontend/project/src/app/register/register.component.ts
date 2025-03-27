import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isCompanyRegistration: boolean = false;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,private companyService: CompanyService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      passwordHash: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactEmail: ['', [Validators.required, Validators.email]],
      taxNumber: ['', [Validators.required, Validators.pattern(/^\d{8}-\d{1}-\d{2}$/), Validators.maxLength(13)]],
      companyName: ['']
    });
  }

  ngOnInit(): void {
    this.registerForm.get('taxNumber')?.clearValidators();
    this.registerForm.get('companyName')?.clearValidators();
    this.registerForm.get('contactEmail')?.clearValidators();
    this.registerForm.updateValueAndValidity();
  }




  isInvalid(field: string): boolean {
    return this.registerForm.get(field)!.invalid && this.registerForm.get(field)!.touched;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      // Céges regisztráció
      if (this.isCompanyRegistration) {
        this.companyService.register(user).subscribe({
          next: (res) => {
            alert('Céges regisztráció sikeres!');
            this.successMessage = 'Sikeresen regisztrálta a céget!';

            console.log('Company registration successful', res);
            this.router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = 'Sikertelenül regisztrálta a cégét!';
            alert('Céges regisztráció sikertelen: ' + err.message);
          }
        });
      } 
      //Személyes regisztráció
      else {
        this.userService.register(user).subscribe({
          next: (res) => {
            alert('Személyes regisztráció sikeres!');
            this.successMessage = 'Sikeres regisztrált!';
            console.log('User registration successful', res);
            this.router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = 'Sikertelenül regisztrált!';
            alert('Személyes regisztráció sikertelen: ' + err.message);
          }
        });
      }
    }
  }

  toggleRegistrationType() {
    this.isCompanyRegistration = !this.isCompanyRegistration;
    this.registerForm.reset();

    if (this.isCompanyRegistration) {
      this.registerForm.get('taxNumber')?.setValidators(Validators.required);
      this.registerForm.get('companyName')?.setValidators(Validators.required);
      this.registerForm.get('contactEmail')?.setValidators([Validators.required, Validators.email]);
      this.registerForm.get('passwordHash')?.setValidators(Validators.required);
      this.registerForm.get('username')?.clearValidators();
      this.registerForm.get('email')?.clearValidators();
    } else {
      this.registerForm.get('taxNumber')?.clearValidators();
      this.registerForm.get('companyName')?.clearValidators();  
      this.registerForm.get('contactEmail')?.clearValidators();
      this.registerForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.registerForm.get('passwordHash')?.setValidators(Validators.required);
      this.registerForm.get('username')?.setValidators(Validators.required);
    }

    this.registerForm.get('taxNumber')?.updateValueAndValidity();
    this.registerForm.get('companyName')?.updateValueAndValidity();
    this.registerForm.get('contactEmail')?.updateValueAndValidity();
    this.registerForm.get('email')?.updateValueAndValidity();
    this.registerForm.get('passwordHash')?.updateValueAndValidity();
    this.registerForm.get('username')?.updateValueAndValidity();
  }

  onTaxNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 
  
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8); // kőtőjel
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10); // második kötőjel
    }
  
    value = value.slice(0, 13);

    input.value = value; // Frissíti az input mezőt
    this.registerForm.get('taxNumber')?.setValue(value); // Szinkronizálja az űrlappal
  }
  
}
