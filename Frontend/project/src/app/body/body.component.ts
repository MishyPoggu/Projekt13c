import { Component, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  selectedFile: File | null = null;
  showForm: boolean = false;
  aosInitialized: boolean = false;
  showMoreFields: boolean = false; 

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
    const video = this.videoPlayer.nativeElement;
    video.load(); 

    const tryPlay = () => {
      video.play()
        .then(() => {
          console.log('Video is playing');
        })
        .catch((error) => {
          console.error('Video play error: ', error);
        });
    };

    tryPlay();

    if (video.paused) {
      const playOnInteraction = () => {
        tryPlay();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction);
      document.addEventListener('touchstart', playOnInteraction);
    }
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

  toggleFields() {
    this.showMoreFields = !this.showMoreFields; 
  }
}
