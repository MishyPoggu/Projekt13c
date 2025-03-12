import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],   
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService,  private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      passwordHash: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  isInvalid(field: string): boolean {
    return this.registerForm.get(field)!.invalid && this.registerForm.get(field)!.touched;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.userService.register(user).subscribe({
        next: (res) => {
          alert('Sikeres regisztráció!');
          console.log('Registration successful', res);
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          alert('Registration failed: ' + err.message);
        }
      });
    }
  }
}
