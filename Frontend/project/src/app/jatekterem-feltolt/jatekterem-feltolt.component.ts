import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadItem } from '../models/upload-item.model';

@Component({
  selector: 'app-jatekretem-feltoltes',
  templateUrl: './jatekterem-feltolt.html',
  styleUrls: ['./jatekterem-feltolt.css']
})
export class JatekteremFeltoltesComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  uploadItems: UploadItem[] = []; // A feltöltött elem lista

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      cím: ['', Validators.required],
      leírás: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Teszt adatok
    this.uploadItems = [
      {
        id: '1',
        cím: 'Teszt Cím 1',
        leírás: 'Ez egy teszt leírás 1.',
        imageUrl: 'https://via.placeholder.com/150',
        értékelés: 5
      },
      {
        id: '2',
        cím: 'Teszt Cím 2',
        leírás: 'Ez egy teszt leírás 2.',
        imageUrl: 'https://via.placeholder.com/150',
        értékelés: 3
      },
      {
        id: '3',
        cím: 'Teszt Cím 3',
        leírás: 'Ez egy teszt leírás 3.',
        imageUrl: 'https://via.placeholder.com/150',
        értékelés: 4
      }
    ];

    // Feltöltött elem betöltése a backendből
    this.http.get<UploadItem[]>('/api/uploads').subscribe(
      data => {
        this.uploadItems = data.sort((a, b) => b.értékelés - a.értékelés); // Értékelés szerinti rendezés
      },
      error => {
        console.error('Nem sikerült betölteni a valódi adatokat, mock adatok megmaradnak.', error);
      }
    );
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('cím', this.uploadForm.get('cím')?.value);
      formData.append('leírás', this.uploadForm.get('leírás')?.value);
      formData.append('image', this.selectedFile);

      this.http.post<UploadItem>('/api/uploads', formData).subscribe(newItem => {
        this.uploadItems.push(newItem);
        this.uploadItems.sort((a, b) => b.értékelés - a.értékelés);
      });
    }
  }

  onRate(item: UploadItem, rating: number): void {
    // Értékelés küldése a backendnek
    this.http.put(`/api/uploads/${item.id}/rate`, { rating }).subscribe(updatedItem => {
      const index = this.uploadItems.findIndex(i => i.id === item.id);
      this.uploadItems[index] = updatedItem as UploadItem;
      this.uploadItems.sort((a, b) => b.értékelés - a.értékelés);
    });
  }
}
