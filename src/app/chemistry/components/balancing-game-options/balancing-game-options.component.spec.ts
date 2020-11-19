import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BalancingGameOptionsComponent } from './balancing-game-options.component';

describe('BalancingGameOptionsComponent', () => {
  let component: BalancingGameOptionsComponent;
  let fixture: ComponentFixture<BalancingGameOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancingGameOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancingGameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
