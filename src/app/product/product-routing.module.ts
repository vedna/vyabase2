import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './add-items/add-items.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'', component:ListComponent},
  {path:'add-items', component:AddItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
