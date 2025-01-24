import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JatekteremFeltoltesComponent } from './jatekterem-feltolt.component';

describe('JatekteremFeltoltComponent', () => {
  let component: JatekteremFeltoltesComponent;
  let fixture: ComponentFixture<JatekteremFeltoltesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JatekteremFeltoltesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JatekteremFeltoltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
