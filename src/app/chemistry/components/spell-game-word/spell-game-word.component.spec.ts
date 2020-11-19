import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpellGameWordComponent } from './spell-game-word.component';

describe('SpellGameWordComponent', () => {
  let component: SpellGameWordComponent;
  let fixture: ComponentFixture<SpellGameWordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellGameWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellGameWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
