import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairGameOptionsComponent } from './pair-game-options.component';

describe('PairGameOptionsComponent', () => {
  let component: PairGameOptionsComponent;
  let fixture: ComponentFixture<PairGameOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairGameOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairGameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
