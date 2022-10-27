import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatmapRoutingModule } from './heatmap-routing.module';
import { HeatmapcompComponent } from './heatmapcomp/heatmapcomp.component';
import { FormsModule } from '@angular/forms';
import { FrappeDirective } from '../frappe.directive';
import { CheckComponent } from './check/check.component';
@NgModule({
  declarations: [
    HeatmapcompComponent,
    FrappeDirective,
    CheckComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeatmapRoutingModule,
    // Chart
  ]
})
export class HeatmapModule { }




