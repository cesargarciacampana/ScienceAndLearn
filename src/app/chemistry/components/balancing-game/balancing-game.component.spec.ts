import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BalancingGameComponent } from './balancing-game.component';

describe('BalancingGameComponent', () => {
  let component: BalancingGameComponent;
  let fixture: ComponentFixture<BalancingGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
