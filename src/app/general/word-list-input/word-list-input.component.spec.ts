import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListInputComponent } from './word-list-input.component';

describe('WordListInputComponent', () => {
  let component: WordListInputComponent;
  let fixture: ComponentFixture<WordListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordListInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
