import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ArcadeService } from '../services/arcade.service';
import { Arcade } from '../arcade';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';

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
  releaseFilter: string = '';

  filteredArcades: Arcade[] = [];
  filteredPinballs: Arcade[] = [];
  filteredConsoles: Arcade[] = [];

  uniquePublishers: string[] = [];
  uniqueGenres: string[] = [];

  userMachines: any;
  companyMachines: any;
  arcadeMachines: any;
  consolesMachines: any;
  pinball: any;

  isCompany: boolean = false;

  constructor(
    private arcadeService: ArcadeService,
    private userService: UserService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.isCompany = !!localStorage.getItem('companyId');
    if (this.isCompany) {
      this.loadCompanyMachines();
    } else {
      this.loadUserMachines();
    }
    this.loadArcades();
    this.loadPinballs();
    this.loadConsoles();
  }

  ngAfterViewInit(): void {
    this.initializeVideoPlayer();
  }

  loadUserMachines() {
    this.userService.getUserMachines(Number(localStorage.getItem("userId"))).subscribe({
      next: (res: any) => {
        this.userMachines = res.machines;
        this.arcadeMachines = this.userMachines.arcadeMachines;
        this.consolesMachines = this.userMachines.consoles;
        this.pinball = this.userMachines.pinballMachines;
      },
      error: (err: HttpErrorResponse) => alert(err.message)
    });
  }

  loadCompanyMachines() {
    const companyId = Number(localStorage.getItem("companyId"));
    this.companyService.getCompanyMachines(companyId).subscribe({
      next: (res: any) => {
        this.companyMachines = res.machines;
        this.arcadeMachines = this.companyMachines.arcadeMachines;
        this.consolesMachines = this.companyMachines.consoles;
        this.pinball = this.companyMachines.pinballMachines;
      },
      error: (err: HttpErrorResponse) => alert(err.message)
    });
  }

  loadArcades() {
    this.arcadeService.getAllArcade().subscribe({
      next: (res: any) => {
        this.arcades = res.data;
        this.filteredArcades = [...this.arcades];
        this.updateUniqueFilters();
      },
      error: (err: HttpErrorResponse) => alert(err.message)
    });
  }

  loadPinballs() {
    this.arcadeService.getAllPinballMachines().subscribe({
      next: (res: any) => {
        this.pinballMachines = res.data;
        this.filteredPinballs = [...this.pinballMachines];
        this.updateUniqueFilters();
      },
      error: (err: HttpErrorResponse) => alert(err.message)
    });
  }

  loadConsoles() {
    this.arcadeService.getAllConsole().subscribe({
      next: (res: any) => {
        this.consoles = res.data;
        this.filteredConsoles = [...this.consoles];
        this.updateUniqueFilters();
      },
      error: (err: HttpErrorResponse) => alert(err.message)
    });
  }

  initializeVideoPlayer(): void {
    const video = this.videoPlayer.nativeElement;
    video.load();
    video.play().catch(() => {
      document.addEventListener('click', () => video.play(), { once: true });
      document.addEventListener('touchstart', () => video.play(), { once: true });
    });
  }

  openData(arcade: Arcade) {
    this.arcade = arcade;
  }
// A szűrések az oldalon //
  filterData() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    const filterFunction = (machine: Arcade) => 
      (machine.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (machine.genre && machine.genre.toLowerCase().includes(lowerCaseSearchTerm)) ||
        machine.publisher.toLowerCase().includes(lowerCaseSearchTerm)) &&
      (!this.publisherFilter || machine.publisher.toLowerCase().includes(this.publisherFilter.toLowerCase())) &&
      (!this.genreFilter || (machine.genre && machine.genre.toLowerCase().includes(this.genreFilter.toLowerCase()))) &&
      (!this.releaseFilter || (machine.release && machine.release.toString().includes(this.releaseFilter)));
    this.filteredArcades = this.arcades.filter(filterFunction);
    this.filteredPinballs = this.pinballMachines.filter(filterFunction);
    this.filteredConsoles = this.consoles.filter(filterFunction);
  }

  updateUniqueFilters() {
    this.uniquePublishers = [...new Set([...this.getUniquePublishers(this.arcades), ...this.getUniquePublishers(this.pinballMachines), ...this.getUniquePublishers(this.consoles)])];
    this.uniqueGenres = [...new Set([...this.getUniqueGenres(this.arcades), ...this.getUniqueGenres(this.pinballMachines), ...this.getUniqueGenres(this.consoles)])];
  }

  getUniquePublishers(data: Arcade[]): string[] {
    return [...new Set(data.map(item => item.publisher).filter(p => p))];
  }

  getUniqueGenres(data: Arcade[]): string[] {
    return [...new Set(data.map(item => item.genre).filter(g => g))];
  }
// gép hozzáadás //
  addMachineToEntity(arcade: Arcade, machineType: string) {
    if (this.isCompany) {
      this.companyService.addMachineToCompany(arcade, machineType).subscribe({
        next: () => window.location.reload(),
        error: (err: HttpErrorResponse) => alert(err.message)
      });
    } else {
      this.userService.addMachineToUser(arcade, machineType).subscribe({
        next: () => window.location.reload(),
        error: (err: HttpErrorResponse) => alert(err.message)
      });
    }
  }
// gép törlés //
  removeMachineFromEntity(arcade: Arcade, machineType: string) {
    if (this.isCompany) {
      this.companyService.removeMachineFromCompany(arcade, machineType).subscribe({
        next: () => window.location.reload(),
        error: (err: HttpErrorResponse) => alert(err.message)
      });
    } else {
      this.userService.removeMachineFromUser(arcade, machineType).subscribe({
        next: () => window.location.reload(),
        error: (err: HttpErrorResponse) => alert(err.message)
      });
    }
  }
}