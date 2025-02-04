import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallyComponent } from './bally.component';

describe('BallyComponent', () => {
  let component: BallyComponent;
  let fixture: ComponentFixture<BallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
