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
  isCustomSelected = false;
  companies: any[] = [];
  locations: any[] = [];
  selectedFile: File | null = null;
  environment = Environment;

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

  onCompanyChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.isCustomSelected = target.value === 'custom';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const formData = new FormData();
    formData.append('userId', localStorage.getItem('userId') || '1');
    formData.append('companyName', this.isCustomSelected ? form.value.customName : form.value.companySelect);
    formData.append('street', form.value.street);
    formData.append('city', form.value.city || '');
    formData.append('zipcode', form.value.zipcode || '');
    formData.append('state', form.value.state || '');
    formData.append('country', form.value.country || '');
    formData.append('content', form.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.postService.createFormPost(formData).subscribe({
      next: (res: any) => {
        this.locations.unshift(res.data);
        form.reset();
        this.selectedFile = null;
        alert('Hely sikeresen hozzáadva!');
      },
      error: (err) => {
        console.error('Error creating post:', err);
        alert('Hiba történt a mentés során!');
      }
    });
  }
}