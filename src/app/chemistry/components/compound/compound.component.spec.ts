import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompoundComponent } from './compound.component';

describe('CompoundComponent', () => {
  let component: CompoundComponent;
  let fixture: ComponentFixture<CompoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
