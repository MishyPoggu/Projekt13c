import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profileservice.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  profilForm: FormGroup;

  constructor(private profileService: ProfileService) {
    this.profilForm = new FormGroup({
      name: new FormControl(''),
      age: new  FormControl(''),
      phone: new FormControl(''),
      profilePic: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileService.getUserProfile().subscribe(data => {
    if (data) {
      this.profilForm.patchValue({
        name: data.name || '',
        age: data.age || '',
        phone: data.phone || '',
        profilePic: data.profilePic || '',
      })
    }

    });
  }
  

  saveProfile() {
    if (this.profilForm.valid) {
    this.profileService.updateUserProfile(this.profilForm.value).subscribe(response => {
      localStorage.setItem('profilePic', this.profilForm.value.profilePic);
      alert('A profilod sikeresen frissítve!')
      window.location.reload();
    });
  }
  }
}
