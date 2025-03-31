import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/companies.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userId = Number(localStorage.getItem('userId'));
  companyId = Number(localStorage.getItem('companyId'));
  profilForm!: FormGroup;
  userProfile: any;
  isCompanyLogin: boolean = false;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile();
  }

  initForm() {
    this.profilForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      phoneNumber: new FormControl(''),
      profilePic: new FormControl(''), // Hozzáadjuk a profilkép mezőt
      registrationNumber: new FormControl(''),
      contactPerson: new FormControl(''),
      websiteUrl: new FormControl('')
    });

    this.updateValidators();
  }

  updateValidators() {
    if (this.isCompanyLogin) {
      this.profilForm.get('name')?.clearValidators();
      this.profilForm.get('age')?.clearValidators();
      this.profilForm.get('phoneNumber')?.clearValidators();
      this.profilForm.get('profilePic')?.clearValidators();

      this.profilForm.get('registrationNumber')?.setValidators([Validators.required]);
      this.profilForm.get('contactPerson')?.setValidators([Validators.required]);
      this.profilForm.get('websiteUrl')?.setValidators([Validators.required]);
    } else {
      this.profilForm.get('registrationNumber')?.clearValidators();
      this.profilForm.get('contactPerson')?.clearValidators();
      this.profilForm.get('websiteUrl')?.clearValidators();

      this.profilForm.get('name')?.setValidators([Validators.required]);
      this.profilForm.get('age')?.setValidators([Validators.required, Validators.min(12), Validators.max(116)]);
      this.profilForm.get('phoneNumber')?.setValidators([Validators.required]);
      this.profilForm.get('profilePic')?.setValidators([]); // Nem kötelező
    }

    this.profilForm.updateValueAndValidity();
  }

  onPhoneNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (!value.startsWith('06')) value = '06' + value.replace(/^0+/, '');
    if (value.length > 2) value = value.slice(0, 2) + ' ' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + ' ' + value.slice(5);
    if (value.length > 9) value = value.slice(0, 9) + ' ' + value.slice(9);
    input.value = value.slice(0, 12);
    this.profilForm.get('phoneNumber')?.setValue(value);
    this.profilForm.get('phoneNumber')?.markAsDirty();
  }

  onRegistrationNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '-' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5);
    if (value.length > 11) value = value.slice(0, 11);
    input.value = value;
    this.profilForm.get('registrationNumber')?.setValue(value);
  }

  onWebsiteUrlInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    if (value && !urlPattern.test(value)) {
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
    this.profilForm.get('websiteUrl')?.setValue(value);
  }

  isInvalid(fieldName: string): boolean {
    const control = this.profilForm.get(fieldName);
    return control ? control.invalid && control.touched && control.value : false;
  }

  loadUserProfile() {
    if (this.companyId) {
      this.isCompanyLogin = true;
      this.companyService.getCompanyProfile(this.companyId).subscribe({
        next: (response) => {
          if (response && response.data) {
            const profile = Array.isArray(response.data)
              ? response.data.find((item: any) => item.companyId === this.companyId)
              : response.data;
            if (profile) {
              this.userProfile = profile;
              this.profilForm.patchValue({
                registrationNumber: this.userProfile.registrationNumber || '',
                contactPerson: this.userProfile.contactPerson || '',
                websiteUrl: this.userProfile.websiteUrl || ''
              });
              this.cdr.detectChanges();
            }
          }
        },
        error: (err) => console.error('Hiba a céges profil betöltésekor:', err)
      });
    } else {
      this.isCompanyLogin = false;
      this.userService.getUserProfile(this.userId).subscribe({
        next: (response) => {
          if (response && response.data) {
            const profile = Array.isArray(response.data)
              ? response.data.find((item: any) => item.userId === this.userId)
              : response.data;
            if (profile) {
              this.userProfile = profile;
              this.profilForm.patchValue({
                name: this.userProfile.name || '',
                age: this.userProfile.age || '',
                phoneNumber: this.userProfile.phoneNumber || '',
                profilePic: this.userProfile.profilePic || ''
              });
              this.cdr.detectChanges();
            }
          }
        },
        error: (err) => console.error('Hiba a felhasználói profil betöltésekor:', err)
      });
    }
    this.updateValidators();
  }

  saveProfile() {
    const formValue = this.profilForm.value;
    let saveObservable;
  
    if (this.isCompanyLogin) {
      const updateData: any = { companyId: this.companyId };
      if (formValue.registrationNumber) updateData.registrationNumber = formValue.registrationNumber;
      if (formValue.contactPerson) updateData.contactPerson = formValue.contactPerson;
      if (formValue.websiteUrl) updateData.websiteUrl = formValue.websiteUrl;
  
      saveObservable = this.companyService.saveCompanyProfile(
        updateData.companyId,
        updateData.registrationNumber || this.userProfile.registrationNumber,
        updateData.contactPerson || this.userProfile.contactPerson,
        updateData.websiteUrl || this.userProfile.websiteUrl
      );
    } else {
      const updateData: any = { userId: this.userId };
      if (formValue.name) updateData.name = formValue.name;
      if (formValue.age) updateData.age = formValue.age;
      if (formValue.phoneNumber) updateData.phoneNumber = formValue.phoneNumber;
      if (formValue.profilePic) updateData.profilePic = formValue.profilePic;
  
      saveObservable = this.userService.saveProfile(
        updateData.userId,
        updateData.name || this.userProfile.name,
        updateData.age || this.userProfile.age,
        updateData.phoneNumber || this.userProfile.phoneNumber,
        updateData.profilePic || this.userProfile.profilePic
      );
    }
  
    if (this.profilForm.valid || Object.keys(formValue).some(key => formValue[key])) {
      saveObservable.subscribe({
        next: (response) => {
          alert('Profil sikeresen frissítve!');
          this.loadUserProfile(); // Frissítjük a profilt
        },
        error: (error) => {
          console.error('Hiba történt:', error);
          alert('Nem sikerült frissíteni az adatokat, próbáld újra!');
        }
      });
    } else {
      alert('Kérlek, tölts ki legalább egy mezőt!');
    }
  }
}