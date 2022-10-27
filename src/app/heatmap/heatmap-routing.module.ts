import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckComponent } from './check/check.component';
import { HeatmapcompComponent } from './heatmapcomp/heatmapcomp.component';

const routes: Routes = [
  {path:"", component:HeatmapcompComponent},
  {path:"heatmap-comp", component:HeatmapcompComponent},
  {path:"check-comp", component:CheckComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeatmapRoutingModule { }
