import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuttingComponent } from './nutting.component';

describe('NuttingComponent', () => {
  let component: NuttingComponent;
  let fixture: ComponentFixture<NuttingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuttingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
