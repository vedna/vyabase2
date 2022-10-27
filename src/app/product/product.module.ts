import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModelMaster } from './productmaster.model';

@NgModule({
  declarations: [
    ListComponent,
    AddItemsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ToastrModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[ ProductModelMaster]
})
export class ProductModule { }
