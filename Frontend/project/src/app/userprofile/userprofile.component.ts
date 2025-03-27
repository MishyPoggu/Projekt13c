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
  userProfile: any = {};
  profilePic = new FormControl("/Frontend/project/src/assets/pfp1.png");

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileService.getUserProfile().subscribe(data => {
    this.userProfile = data || {}; 

    });
  }
  

  saveProfile() {
    this.profileService.updateUserProfile(this.userProfile).subscribe(response => {
      localStorage.setItem('profilePic', this.userProfile.profilePic);
      window.location.reload();
      alert('A profilod sikeresen frissítve!')
    });
  }
}
