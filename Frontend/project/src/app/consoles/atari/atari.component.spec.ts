import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtariComponent } from './atari.component';

describe('AtariComponent', () => {
  let component: AtariComponent;
  let fixture: ComponentFixture<AtariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
