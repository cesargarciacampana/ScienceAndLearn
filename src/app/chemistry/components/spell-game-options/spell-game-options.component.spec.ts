import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellGameOptionsComponent } from './spell-game-options.component';

describe('SpellGameOptionsComponent', () => {
  let component: SpellGameOptionsComponent;
  let fixture: ComponentFixture<SpellGameOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellGameOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellGameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
