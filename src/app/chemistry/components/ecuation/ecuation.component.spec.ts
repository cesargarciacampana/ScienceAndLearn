import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EcuationComponent } from './ecuation.component';

describe('EcuationComponent', () => {
  let component: EcuationComponent;
  let fixture: ComponentFixture<EcuationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EcuationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
