import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BalancingGameBalancerComponent } from './balancing-game-balancer.component';

describe('BalancingGameBalancerComponent', () => {
  let component: BalancingGameBalancerComponent;
  let fixture: ComponentFixture<BalancingGameBalancerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancingGameBalancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancingGameBalancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
