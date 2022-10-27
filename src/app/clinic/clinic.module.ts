import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ListComponent } from './list/list.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicModelMaster } from './clinic-master.model';


@NgModule({
  declarations: [
    AddDetailsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    BsDropdownModule,
    ModalModule,
    ToastrModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  providers:[ ClinicModelMaster]
})
export class ClinicModule { }
