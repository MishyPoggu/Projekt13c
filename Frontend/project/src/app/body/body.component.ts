import { Component, HostListener } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class BodyComponent {
  selectedFile: File | null = null;
  showForm: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    this.showForm = scrollPosition > 100; 
  }

  onSubmit() {
    console.log('Elküldve!');
    // backend 
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Kiválasztott fájl:', this.selectedFile);
    }
  }
}
