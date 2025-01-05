import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  slideIndex: number = 0;

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides(): void {
    const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    if (slides[this.slideIndex - 1]) {
      slides[this.slideIndex - 1].style.display = 'block';
    }
    setTimeout(() => this.showSlides(), 3000);
  }

  showContent(index: number): void {
    const contentContainer = document.getElementById('content-container');
    const contents = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;

    if (!contentContainer) return;

    for (let i = 0; i < contents.length; i++) {
      contents[i].style.display = 'none';
    }

    const targetContent = document.getElementById(`content${index}`);
    if (targetContent) {
      targetContent.style.display = 'block';
    }

    contentContainer.style.display = 'flex';
  }

  closeContent(): void {
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
      contentContainer.style.display = 'none';
    }
  }
}
