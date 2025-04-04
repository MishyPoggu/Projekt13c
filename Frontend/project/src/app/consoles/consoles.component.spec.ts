import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolesComponent } from './consoles.component';

describe('ConsolesComponent', () => {
  let component: ConsolesComponent;
  let fixture: ComponentFixture<ConsolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
