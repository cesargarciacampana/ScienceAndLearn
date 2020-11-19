import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PairGameComponent } from './pair-game.component';

describe('PairGameComponent', () => {
  let component: PairGameComponent;
  let fixture: ComponentFixture<PairGameComponent>;

  beforeEach(waitForAsync(() => {
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
