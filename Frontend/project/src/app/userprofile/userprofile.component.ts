import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profileservice.service';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  userProfile: any = {};

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
      alert('A profilod sikeresen frissítve!')
    });
  }
}
