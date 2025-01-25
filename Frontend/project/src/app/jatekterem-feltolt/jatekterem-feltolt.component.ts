import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jatekterem-feltolt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jatekterem-feltolt.component.html',
  styleUrls: ['./jatekterem-feltolt.component.css']
})
export class JatekteremFeltoltesComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  errorMessage = '';
  uploadedItems: Array<{ title: string; description: string; imageUrl: string; rating: number }> = [
    {
      title: 'Első teszt elem',
      description: 'Ez egy teszt leírás az első elemhez.',
      imageUrl: 'https://via.placeholder.com/100', 
      rating: 5
    },
    {
      title: 'Második teszt elem',
      description: 'Ez egy másik teszt elem leírása.',
      imageUrl: 'https://via.placeholder.com/100', 
      rating: -3
    }
  ]; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.uploadForm.patchValue({ image: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      this.errorMessage = 'Minden mező kitöltése kötelező!';
      return;
    }

    this.errorMessage = '';
    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('title', this.uploadForm.get('title')?.value);
    formData.append('description', this.uploadForm.get('description')?.value);
    formData.append('image', this.selectedFile);

    this.http.post<{ imageUrl: string }>('http://localhost:3000/upload', formData).subscribe({
      next: (response) => {
        console.log('Sikeres feltöltés:', response);

        this.uploadedItems.push({
          title: this.uploadForm.get('title')?.value,
          description: this.uploadForm.get('description')?.value,
          imageUrl: response.imageUrl, 
          rating: 0 
        });

        this.isSubmitting = false;
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Hiba történt:', err);
        this.errorMessage = 'A feltöltés sikertelen, próbáld újra!';
        this.isSubmitting = false;
      }
    });
  }

  rateItem(item: any, value: number): void {
    item.rating += value;
  }
}
