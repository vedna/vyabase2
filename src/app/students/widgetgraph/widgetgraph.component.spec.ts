import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetgraphComponent } from './widgetgraph.component';

describe('WidgetgraphComponent', () => {
  let component: WidgetgraphComponent;
  let fixture: ComponentFixture<WidgetgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetgraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
