import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-consoles',
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.css']
})
export class ConsolesComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.load();

    const tryPlay = () => {
      video.play().catch((error) => {
        console.warn('Videó nem tudott elindulni automatikusan:', error);
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
}
