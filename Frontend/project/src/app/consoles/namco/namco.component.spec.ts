import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamcoComponent } from './namco.component';

describe('NamcoComponent', () => {
  let component: NamcoComponent;
  let fixture: ComponentFixture<NamcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamcoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
