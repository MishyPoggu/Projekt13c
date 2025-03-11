import { Component, OnInit } from '@angular/core';
import { ArcadeService } from '../services/arcade.service';
import { Arcade } from '../arcade';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-raktar',
  imports: [CommonModule, FormsModule],
  templateUrl: './raktar.component.html',
  styleUrl: './raktar.component.css'
})
export class RaktarComponent implements OnInit{

  constructor(private arcadeService:ArcadeService) { }

  arcades: Arcade[] = [];

  arcade:Arcade= {id:0, name:"", genre:"", publisher:"", release:""};

  ngOnInit(): void {
    this.arcadeService.getAllArcade().subscribe({
      next:(res:any) =>{
        this.arcades = res.data;
      },
      error:(err:HttpErrorResponse)=> {
        alert(err.message)
      }
    })
  }


  openData(arcade:Arcade) {
    this.arcade = arcade
  }

}
