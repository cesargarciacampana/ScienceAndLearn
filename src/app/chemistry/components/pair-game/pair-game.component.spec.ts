import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairGameComponent } from './pair-game.component';

describe('PairGameComponent', () => {
  let component: PairGameComponent;
  let fixture: ComponentFixture<PairGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
