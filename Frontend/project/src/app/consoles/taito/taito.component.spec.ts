import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaitoComponent } from './taito.component';

describe('TaitoComponent', () => {
  let component: TaitoComponent;
  let fixture: ComponentFixture<TaitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
