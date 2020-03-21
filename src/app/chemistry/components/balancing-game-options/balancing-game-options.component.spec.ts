import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancingGameOptionsComponent } from './balancing-game-options.component';

describe('BalancingGameOptionsComponent', () => {
  let component: BalancingGameOptionsComponent;
  let fixture: ComponentFixture<BalancingGameOptionsComponent>;

  beforeEach(async(() => {
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
