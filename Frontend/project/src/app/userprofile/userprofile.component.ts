import { Component, OnInit } from '@angular/core';
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
  profilForm!: FormGroup;  // Biztos, hogy inicializálva legyen
  userProfile: any;
  isCompanyLogin: boolean = false;

  constructor(private userService: UserService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile(); 
  }

  initForm() {
    this.profilForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(12), Validators.max(116)]),
      phoneNumber: new FormControl('', [Validators.required]),
      profilePic: new FormControl('', [Validators.required]),
      registrationNumber: new FormControl(''),
      contactPerson: new FormControl(''),
      websiteUrl: new FormControl('')
    });

    this.updateValidators();  // Frissítjük a validátorokat
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
      this.profilForm.get('profilePic')?.setValidators([Validators.required]);
    }

    this.profilForm.updateValueAndValidity();
  }

  onPhoneNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('06')) {
      if (value.length > 2) value = value.slice(0, 2) + ' ' + value.slice(2);
      if (value.length > 5) value = value.slice(0, 5) + ' ' + value.slice(5);
      if (value.length > 9) value = value.slice(0, 9) + ' ' + value.slice(9);
    }
    
    input.value = value.slice(0, 12);
    this.profilForm.get('phoneNumber')?.setValue(value);
  }

  onRegistrationNumberInput(event: Event): void { 
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Csak számokat hagyunk meg
  
    if (value.length > 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
  
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

  onTestSubmit() {
    console.log('A form elküldésre került!');
  }

  isInvalid(fieldName: string): boolean {
    const control = this.profilForm.get(fieldName); 
    return control ? control.invalid && control.touched : false;
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
      });
    } else {
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

    this.updateValidators();  // Profil betöltése után frissítjük a validátorokat
  }

  saveProfile() {
    console.log('Mentés gombra kattintottak!');
    if (this.profilForm.valid) {
      console.log('Űrlap valid, adatküldés...');
      if (this.isCompanyLogin) {
        this.companyService.saveCompanyProfile(
          this.companyId,
          this.profilForm.value.registrationNumber,
          this.profilForm.value.contactPerson,
          this.profilForm.value.websiteUrl
        ).subscribe(response => {
          alert('A céges profilod sikeresen frissítve!');
          // Az új adatokat betöltjük a szerkesztett profilba
          this.loadUserProfile();
        }, error => {
          console.error('Nem sikerült frissíteni az adatokat:', error);
          alert('Nem sikerült frissíteni az adatokat, próbáld újra!');
        });
      } else {
        this.userService.saveProfile(
          this.userId,
          this.profilForm.value.name,
          this.profilForm.value.age,
          this.profilForm.value.phoneNumber,
          this.profilForm.value.profilePic
        ).subscribe(response => {
          localStorage.setItem('profilePic', this.profilForm.value.profilePic);
          alert('A profilod sikeresen frissítve!');
          // Az új adatokat betöltjük a szerkesztett profilba
          this.loadUserProfile();
        }, error => {
          console.error('Nem sikerült frissíteni az adatokat:', error);
          alert('Nem sikerült frissíteni az adatokat, próbáld újra!');
        });
      }
    } else {
      console.log('Az űrlap érvénytelen! Ellenőrizd a beviteli mezőket.');
    }
  }
}