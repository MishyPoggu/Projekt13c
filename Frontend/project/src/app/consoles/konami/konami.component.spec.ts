import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonamiComponent } from './konami.component';

describe('KonamiComponent', () => {
  let component: KonamiComponent;
  let fixture: ComponentFixture<KonamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonamiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
