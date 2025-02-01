import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaystationComponent } from './playstation.component';

describe('PlaystationComponent', () => {
  let component: PlaystationComponent;
  let fixture: ComponentFixture<PlaystationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaystationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaystationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
