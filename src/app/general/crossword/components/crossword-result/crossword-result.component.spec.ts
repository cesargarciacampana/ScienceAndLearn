import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosswordResultComponent } from './crossword-result.component';

describe('CrosswordResultComponent', () => {
  let component: CrosswordResultComponent;
  let fixture: ComponentFixture<CrosswordResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrosswordResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrosswordResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
