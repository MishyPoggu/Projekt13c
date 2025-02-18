import { Component, HostListener, AfterViewInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ScrolldownComponent } from '../../scrolldown/scrolldown.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ScrolldownComponent],
})
export class BodyComponent implements AfterViewInit {
  selectedFile: File | null = null;
  showForm: boolean = false; 
  aosInitialized: boolean = false; 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50 && !this.aosInitialized) {
      this.aosInitialized = true; 
      this.showForm = true;

      AOS.init({
        duration: 2000, 
        once: false, 
      });
    }
  }

  ngAfterViewInit() {
  }

  onSubmit() {
    console.log('Elküldve!');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Kiválasztott fájl:', this.selectedFile);
    }
  }
}
