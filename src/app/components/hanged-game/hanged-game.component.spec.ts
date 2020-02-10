import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangedGameComponent } from './hanged-game.component';

describe('HangedGameComponent', () => {
  let component: HangedGameComponent;
  let fixture: ComponentFixture<HangedGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangedGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
