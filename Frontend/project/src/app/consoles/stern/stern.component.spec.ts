import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SternComponent } from './stern.component';

describe('SternComponent', () => {
  let component: SternComponent;
  let fixture: ComponentFixture<SternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
