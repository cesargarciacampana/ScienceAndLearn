import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationGameComponent } from './calculation-game.component';

describe('CalculationGameComponent', () => {
  let component: CalculationGameComponent;
  let fixture: ComponentFixture<CalculationGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
