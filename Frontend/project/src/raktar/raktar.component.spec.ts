import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaktarComponent } from './raktar.component';

describe('RaktarComponent', () => {
  let component: RaktarComponent;
  let fixture: ComponentFixture<RaktarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaktarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaktarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
