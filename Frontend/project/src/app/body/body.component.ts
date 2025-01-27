import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class BodyComponent {
  selectedFile: File | null = null;

  onSubmit() {
    console.log('Űrlap elküldve!');
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
