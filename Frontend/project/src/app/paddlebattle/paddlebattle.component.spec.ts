import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddlebattleComponent } from './paddlebattle.component';

describe('PaddlebattleComponent', () => {
  let component: PaddlebattleComponent;
  let fixture: ComponentFixture<PaddlebattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaddlebattleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaddlebattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
