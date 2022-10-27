import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAppointComponent } from './edit-appoint/edit-appoint.component';
import { GridComponent } from './grid/grid.component';
import { SlickComponent } from './slick/slick.component';
import { StudentComponent } from './student/student.component';
import { SampleslickComponent } from './sampleslick/sampleslick.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { WidgetgraphComponent } from './widgetgraph/widgetgraph.component';


const routes: Routes = [
  {path:'', component:StudentComponent},
  {path:'add-student', component:AddDetailsComponent},
  {path:'edit-student', component:EditAppointComponent},
  {path:'view-student', component:ViewDetailsComponent},
  {path:'grid', component:GridComponent},
  {path:'slickcomp', component:SlickComponent},
  {path:'sampleslick', component:SampleslickComponent},
  {path:'widgetgraph', component:WidgetgraphComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
