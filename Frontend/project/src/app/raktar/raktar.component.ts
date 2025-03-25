import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ArcadeService } from '../services/arcade.service';
import { Arcade } from '../arcade';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserMachine } from '../user-machine';

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

  searchTerm: string = '';
  publisherFilter: string = '';
  genreFilter: string = '';

  filteredArcades: Arcade[] = [];
  filteredPinballs: Arcade[] = [];
  filteredConsoles: Arcade[] = [];

  uniquePublishers: string[] = [];
  uniqueGenres: string[] = [];

  constructor(private arcadeService: ArcadeService, private userService:UserService) { }

  addMachineToUser(arcade:Arcade, machineType:string) {
    this.userService.addMachineToUser(arcade, machineType).subscribe({
      next:(res:any)=> {
        window.location.reload();
      },
      error:(err:HttpErrorResponse)=> {
        alert(err.message)
      }
    })
  }

  userMachines:any;
  arcadeMachines:any;
  consolesMachines:any;
  pinball:any;

  ngOnInit(): void {

    this.userService.getUserMachines(Number(localStorage.getItem("userId"))).subscribe({
      next:(res:any)=> {
        this.userMachines = res.machines;
        this.arcadeMachines=this.userMachines.arcadeMachines;
        this.consolesMachines=this.userMachines.consoles;
        this.pinball=this.userMachines.pinballMachines;
      },
      error:(err:HttpErrorResponse)=> {
        alert(err.message)
      }
    })





    this.arcadeService.getAllArcade().subscribe({
      next: (res: any) => {
        this.arcades = res.data;
        this.filteredArcades = res.data; 
        this.uniquePublishers = this.getUniquePublishers(this.arcades);
        this.uniqueGenres = this.getUniqueGenres(this.arcades);
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });

    this.arcadeService.getAllPinballMachines().subscribe({
      next: (res: any) => {
        this.pinballMachines = res.data;
        this.filteredPinballs = res.data;
        this.uniquePublishers = [...new Set([...this.uniquePublishers, ...this.getUniquePublishers(this.pinballMachines)])];
        this.uniqueGenres = [...new Set([...this.uniqueGenres, ...this.getUniqueGenres(this.pinballMachines)])];
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });

    this.arcadeService.getAllConsole().subscribe({
      next: (res: any) => {
        this.consoles = res.data;
        this.filteredConsoles = res.data;
        this.uniquePublishers = [...new Set([...this.uniquePublishers, ...this.getUniquePublishers(this.consoles)])];
        this.uniqueGenres = [...new Set([...this.uniqueGenres, ...this.getUniqueGenres(this.consoles)])];
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

  filterData() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    this.filteredArcades = this.arcades.filter((arcade) =>
      (arcade.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        arcade.genre.toLowerCase().includes(lowerCaseSearchTerm) ||
        arcade.publisher.toLowerCase().includes(lowerCaseSearchTerm)) &&
      (this.publisherFilter ? arcade.publisher.toLowerCase().includes(this.publisherFilter.toLowerCase()) : true) &&
      (this.genreFilter ? arcade.genre.toLowerCase().includes(this.genreFilter.toLowerCase()) : true)
    );
  
    this.filteredPinballs = this.pinballMachines.filter((pinball) =>
      (pinball.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        pinball.genre.toLowerCase().includes(lowerCaseSearchTerm) ||
        pinball.publisher.toLowerCase().includes(lowerCaseSearchTerm)) &&
      (this.publisherFilter ? pinball.publisher.toLowerCase().includes(this.publisherFilter.toLowerCase()) : true) &&
      (this.genreFilter ? pinball.genre.toLowerCase().includes(this.genreFilter.toLowerCase()) : true)
    );
  
    this.filteredConsoles = this.consoles.filter((console) =>
      (console.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        console.genre.toLowerCase().includes(lowerCaseSearchTerm) ||
        console.publisher.toLowerCase().includes(lowerCaseSearchTerm)) &&
      (this.publisherFilter ? console.publisher.toLowerCase().includes(this.publisherFilter.toLowerCase()) : true) &&
      (this.genreFilter ? console.genre.toLowerCase().includes(this.genreFilter.toLowerCase()) : true)
    );
  }
  
  getUniquePublishers(data: Arcade[]): string[] {
    return [...new Set(data.map(item => item.publisher))];
  }
  getUniqueGenres(data: Arcade[]): string[] {
    return [...new Set(data.map(item => item.genre))];
  }
}
