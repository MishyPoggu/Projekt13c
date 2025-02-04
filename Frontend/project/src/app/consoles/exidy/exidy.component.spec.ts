import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExidyComponent } from './exidy.component';

describe('ExidyComponent', () => {
  let component: ExidyComponent;
  let fixture: ComponentFixture<ExidyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExidyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExidyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
