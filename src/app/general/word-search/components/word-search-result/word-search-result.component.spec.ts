import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSearchResultComponent } from './word-search-result.component';

describe('WordSearchResultComponent', () => {
  let component: WordSearchResultComponent;
  let fixture: ComponentFixture<WordSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
