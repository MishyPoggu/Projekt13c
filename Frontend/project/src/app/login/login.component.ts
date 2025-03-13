import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
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

  

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
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
           Environment.userId = res.userId;
          console.log(Environment.userId);
          localStorage.setItem("userId", res.userId);
          alert('Sikeres bejelentkezés!');
          console.log('Login successful', res);
          this.router.navigate(['/body']);
         
        },
        error: (err: HttpErrorResponse) => {
          alert('Login failed: ' + err.message);
        }
      });
    }
  }
}
