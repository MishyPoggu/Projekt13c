import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ArcadeService } from '../services/arcade.service';
import { Arcade } from '../arcade';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-raktar',
  imports: [CommonModule, FormsModule],
  templateUrl: './raktar.component.html',
  styleUrls: ['./raktar.component.css']
})
export class RaktarComponent implements OnInit, AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  arcades: Arcade[] = [];
  pinballMachines: Arcade[] = [];
  consoles: Arcade[] = [];

  arcade: Arcade = { id: 0, name: "", genre: "", publisher: "", release: "" };

  constructor(private arcadeService: ArcadeService) { }

  ngOnInit(): void {
    this.arcadeService.getAllArcade().subscribe({
      next: (res: any) => {
        this.arcades = res.data;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });

    this.arcadeService.getAllPinballMachines().subscribe({
      next: (res: any) => {
        this.pinballMachines = res.data;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });

    this.arcadeService.getAllConsole().subscribe({
      next: (res: any) => {
        this.consoles = res.data;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  ngAfterViewInit(): void {
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

  openData(arcade: Arcade) {
    this.arcade = arcade;
  }
}
