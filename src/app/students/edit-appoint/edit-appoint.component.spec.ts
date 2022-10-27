import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointComponent } from './edit-appoint.component';

describe('EditAppointComponent', () => {
  let component: EditAppointComponent;
  let fixture: ComponentFixture<EditAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
