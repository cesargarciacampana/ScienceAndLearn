import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWordComponent } from './game-word.component';

describe('Game.WordComponent', () => {
  let component: GameWordComponent;
  let fixture: ComponentFixture<GameWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
