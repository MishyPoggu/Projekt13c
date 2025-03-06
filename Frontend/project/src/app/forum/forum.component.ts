import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js'; 
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
