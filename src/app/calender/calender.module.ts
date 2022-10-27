import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
// import { CalendercompComponent } from './calendercomp/calendercomp.component';
import { CalendercompComponent } from './calendercomp/calendercomp.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export function momentAdapterFactory(){
  return adapterFactory();
};

@NgModule({
  declarations: [
    CalendercompComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ]
})
export class CalenderModule { }
