import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  userId = Number(localStorage.getItem('userId'));  
  profilForm: FormGroup;

  constructor(private userService: UserService) {  
    this.profilForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(null),
      phoneNumber: new FormControl(''),
      profilePic: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe(data => {  
      if (data) {
        this.profilForm.patchValue({
          name: data.name || '',
          age: data.age || null,
          phoneNumber: data.phoneNumber || '', 
          profilePic: data.profilePic || '',
        });
      }
    });
  }

  saveProfile() {
    if (this.profilForm.valid) {
      this.userService.saveProfile(
        this.userId,
        this.profilForm.value.name,
        this.profilForm.value.age,
        this.profilForm.value.phoneNumber,
        this.profilForm.value.profilePic
      ).subscribe(response => {
        localStorage.setItem('profilePic', this.profilForm.value.profilePic);  // Pfp mentés
        alert('A profilod sikeresen frissítve!');
        window.location.reload();
      },
      error => {
        console.error('Nem sikerült frissíteni az adatokat:', error)
        alert('Nem sikerült frissíteni az adatokat, próbáld újra!')
      }
    );
    }
  }
}
