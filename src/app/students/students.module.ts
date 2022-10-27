import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentComponent } from './student/student.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// material
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EditAppointComponent } from './edit-appoint/edit-appoint.component';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './grid/grid.component';
import { SlickComponent } from './slick/slick.component';
import { AngularSlickgridModule } from "angular-slickgrid";
import { SampleslickComponent } from './sampleslick/sampleslick.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { StudentService } from '../service/student.service';
import { StudentMaster } from './student-master.model';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';

import 'flatpickr/dist/l10n/fr';
import { WidgetgraphComponent } from './widgetgraph/widgetgraph.component';


@NgModule({
  declarations: [
    StudentComponent,
    EditAppointComponent,
    GridComponent,
    SlickComponent,
    SampleslickComponent,
    AddDetailsComponent,
    ViewDetailsComponent,
    WidgetgraphComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ModalModule,
    ToastrModule.forRoot(),
    AgGridModule,
    AngularSlickgridModule.forRoot(),
    ChartsModule
  ],
  providers: [
    StudentService, StudentMaster
  ],
  // bootstrap: [MaterialmodelComponent]
})
export class StudentsModule { }
