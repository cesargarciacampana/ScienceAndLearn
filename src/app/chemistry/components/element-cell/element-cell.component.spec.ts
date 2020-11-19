import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementCellComponent } from './element-cell.component';

describe('ElementCellComponent', () => {
  let component: ElementCellComponent;
  let fixture: ComponentFixture<ElementCellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
