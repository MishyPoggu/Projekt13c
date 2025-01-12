import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, AfterViewInit {
  slideIndex: number = 0;
  currentIndex: number = 0;

  @ViewChild('mainImage', { static: false }) mainImage!: ElementRef<HTMLImageElement>;
  @ViewChild('title', { static: false }) title!: ElementRef<HTMLHeadingElement>;
  @ViewChild('description', { static: false }) description!: ElementRef<HTMLParagraphElement>;

  ngOnInit(): void {
    this.showSlides();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  // Slideshow
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
    setTimeout(() => this.showSlides(), 3000); // 3 másodpercenként váltja a képeket
  }

  // Carousel működése
  initializeCarousel(): void {
    const backButton = document.getElementById('vissza-gomb')!;
    const forwardButton = document.getElementById('elore-gomb')!;
    const thumbnails = document.querySelectorAll('.thumbnail') as NodeListOf<HTMLElement>;

    backButton.addEventListener('click', () => this.navigateCarousel('back', thumbnails));
    forwardButton.addEventListener('click', () => this.navigateCarousel('forward', thumbnails));

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => this.updateContent(index, thumbnails));
    });
  }

  // Carousel előre-hátra gombokkal való navigáció
  navigateCarousel(direction: string, thumbnails: NodeListOf<HTMLElement>): void {
    if (direction === 'back') {
      this.currentIndex = (this.currentIndex - 1 + thumbnails.length) % thumbnails.length;
    } else {
      this.currentIndex = (this.currentIndex + 1) % thumbnails.length;
    }
    this.updateContent(this.currentIndex, thumbnails);
  }

  // Változtatja a nagyobbik képet
  updateContent(index: number, thumbnails: NodeListOf<HTMLElement>): void {

    thumbnails.forEach((thumb) => thumb.classList.remove('active'));

    // Amire rá van kattintva az lesz az aktuális
    const activeThumbnail = thumbnails[index];
    activeThumbnail.classList.add('active');

    // Kicseréli a képet és a lerírást
    if (this.mainImage && this.title && this.description) {
      const imageSrc = activeThumbnail.getAttribute('data-image');
      const imageTitle = activeThumbnail.getAttribute('data-title');
      const imageDescription = activeThumbnail.getAttribute('data-description');

      if (imageSrc) {
        this.mainImage.nativeElement.src = `/assets/${imageSrc}`;
      }
      if (imageTitle) {
        this.title.nativeElement.textContent = imageTitle;
      }
      if (imageDescription) {
        this.description.nativeElement.textContent = imageDescription;
      }
    }
  }
}
