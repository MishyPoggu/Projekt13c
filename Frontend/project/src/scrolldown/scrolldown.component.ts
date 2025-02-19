import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrolldown',
  imports: [],
  templateUrl: './scrolldown.component.html',
  styleUrl: './scrolldown.component.css'
})
export class ScrolldownComponent {
  isVisible = true;


  scrollDown() {
    const nextSection = document.getElementById('uj-resz');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth'});
      this.isVisible = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY == 0) {
      this.isVisible = true;
    }
  }


}
