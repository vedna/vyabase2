import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapcompComponent } from './heatmapcomp.component';

describe('HeatmapcompComponent', () => {
  let component: HeatmapcompComponent;
  let fixture: ComponentFixture<HeatmapcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatmapcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
