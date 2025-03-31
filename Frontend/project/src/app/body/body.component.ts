import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { CompanyService } from '../services/companies.service';
import { Environment } from '../environment';
import { CommonModule } from '@angular/common';
import { ScrolldownComponent } from '../scrolldown/scrolldown.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule, CommonModule, ScrolldownComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, AfterViewInit {
  showForm = true;
  showMoreFields = false;
  companies: any[] = [];
  locations: any[] = [];
  selectedFile: File | null = null;
  environment = Environment;
  currentUserId: number = Number(localStorage.getItem('userId')) || 0; 
  isLoggedIn: boolean = !!localStorage.getItem('userId'); 

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(
    private http: HttpClient,
    private postService: PostService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe({
      next: (res: any) => {
        this.companies = res.data;
      },
      error: (err) => {
        console.error('Error fetching companies:', err);
      }
    });

    this.loadLocations();
  }

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

  toggleFields() {
    this.showMoreFields = !this.showMoreFields;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid || !this.isLoggedIn) {
      if (!this.isLoggedIn) {
        alert('Kérlek, jelentkezz be a mentéshez!');
      }
      return;
    }

    const formData = new FormData();
    formData.append('userId', this.currentUserId.toString());
    formData.append('companyName', form.value.companyName);
    formData.append('street', form.value.street);
    formData.append('city', form.value.city);
    formData.append('zipcode', form.value.zipcode);
    formData.append('state', form.value.state);
    formData.append('country', form.value.country);
    formData.append('content', form.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
// hirdetés létrehozása //
    this.postService.createFormPost(formData).subscribe({
      next: (res: any) => {
        this.loadLocations(); 
        form.reset();
        this.selectedFile = null;
        this.showMoreFields = false;
        alert('Hely sikeresen hozzáadva!');
      },
      error: (err) => {
        console.error('Error creating post:', err);
        alert('Hiba történt a mentés során!');
      }
    });
  }
// hirdetés törlése //
  deleteLocation(postId: number) {
    if (!this.isLoggedIn) {
      alert('Kérlek, jelentkezz be a törléshez!');
      return;
    }

    if (confirm('Biztosan törölni szeretnéd ezt a hirdetést?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.loadLocations(); 
          alert('Hirdetés sikeresen törölve!');
        },
        error: (err) => {
          console.error('Error deleting post:', err);
          alert('Hiba történt a törlés során!');
        }
      });
    }
  }

  private loadLocations() {
    this.postService.getLocations().subscribe({
      next: (res: any) => {
        this.locations = res.data;
        console.log('Locations:', this.locations);
      },
      error: (err) => {
        console.error('Error fetching locations:', err);
      }
    });
  }
}