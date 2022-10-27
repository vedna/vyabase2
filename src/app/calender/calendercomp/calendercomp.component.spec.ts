import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendercompComponent } from './calendercomp.component';

describe('CalendercompComponent', () => {
  let component: CalendercompComponent;
  let fixture: ComponentFixture<CalendercompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendercompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendercompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
