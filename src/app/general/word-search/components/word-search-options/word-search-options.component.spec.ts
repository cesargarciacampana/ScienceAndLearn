import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSearchOptionsComponent } from './word-search-options.component';

describe('WordSearchOptionsComponent', () => {
  let component: WordSearchOptionsComponent;
  let fixture: ComponentFixture<WordSearchOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordSearchOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSearchOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
