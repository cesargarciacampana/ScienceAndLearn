import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutorComponent } from './resolutor.component';

describe('ResolutorComponent', () => {
  let component: ResolutorComponent;
  let fixture: ComponentFixture<ResolutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
