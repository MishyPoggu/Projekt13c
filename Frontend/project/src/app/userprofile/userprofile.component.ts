import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service';
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
  companyId = Number(localStorage.getItem('companyId'));
  profilForm: FormGroup; 
  userProfile: any;
  isCompanyLogin: boolean = false;

  constructor(private userService: UserService, private companyService: CompanyService) {  
    this.profilForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      phoneNumber: new FormControl(''),
      profilePic: new FormControl(''),

      registrationNumber: new FormControl(''),
      contactPerson: new FormControl(''),
      websiteUrl: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    if (this.companyId) {
      this.isCompanyLogin = true;
      this.companyService.getCompanyProfile(this.companyId).subscribe(data => {
        if (data) {
          this.userProfile = data;
          this.profilForm.patchValue({
            registrationNumber: data.registrationNumber || '',
            contactPerson: data.contactPerson || '',
            websiteUrl: data.websiteUrl || '',
          });
        }
      })
    }else {
      this.isCompanyLogin = false;
      this.userService.getUserProfile(this.userId).subscribe(data => {  
        if (data) {
          this.userProfile = data;
          this.profilForm.patchValue({
            name: data.name || '',
            age: data.age || null,
            phoneNumber: data.phoneNumber || '', 
            profilePic: data.profilePic || '',
          });
        }
      });
    }
  }

  saveProfile() {
    if (this.profilForm.valid) {
      if (this.isCompanyLogin) {
        this.companyService.saveCompanyProfile(
          this.companyId,
          this.profilForm.value.registrationNumber,
          this.profilForm.value.contactPerson,
          this.profilForm.value.websiteUrl,
        ).subscribe(response => {
          alert('A céges profilod sikeresen frissítve!');
          window.location.reload();
        },
        error => {
          console.error('Nem sikerült frissíteni az adatokat:', error)
          alert('Nem sikerült frissíteni az adatokat, próbáld újra!')
        }
      )}else {
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
    );}
    }
  }
}
