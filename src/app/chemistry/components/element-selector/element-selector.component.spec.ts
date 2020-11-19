import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementSelectorComponent } from './element-selector.component';

describe('ElementSelectorComponent', () => {
  let component: ElementSelectorComponent;
  let fixture: ComponentFixture<ElementSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
