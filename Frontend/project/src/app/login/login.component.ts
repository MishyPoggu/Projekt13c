import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      passwordHash: ['', Validators.required]
    });
  }  

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, passwordHash } = this.loginForm.value;
      console.log('Login Form Values:', this.loginForm.value);


      this.userService.login(username, passwordHash).subscribe({
        next: (res) => {
          console.log('Login successful', res);
        },
        error: (err: HttpErrorResponse) => {
          alert('Login failed: ' + err.message);
        }
      });
    }
  }
}
