import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleslickComponent } from './sampleslick.component';

describe('SampleslickComponent', () => {
  let component: SampleslickComponent;
  let fixture: ComponentFixture<SampleslickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleslickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleslickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
