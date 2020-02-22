import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellGameComponent } from './spell-game.component';

describe('SpellGameComponent', () => {
  let component: SpellGameComponent;
  let fixture: ComponentFixture<SpellGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
