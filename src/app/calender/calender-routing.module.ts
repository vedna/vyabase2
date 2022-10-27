import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendercompComponent } from './calendercomp/calendercomp.component';

const routes: Routes = [
  {path:"", component:CalendercompComponent},
  {path:"calender-comp", component:CalendercompComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
