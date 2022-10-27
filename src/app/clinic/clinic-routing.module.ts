import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: '', component:ListComponent},
  {path: 'add-details', component:AddDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
