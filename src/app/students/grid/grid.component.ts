import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { StudentService } from '../../service/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  
  public rowData: any[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  selectedId: string = "";
  editingId: string = "";
  showDelete: boolean = false;
  frameworkComponents: {} = {};

  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  gridApi: any;
  editedStudentData: any;

  constructor(private gridservice:StudentService,private notification: ToastrService) {
  }

  ngOnInit(): void {
    this.getdetails();
  }


public columnDefs: ColDef[] = [
  {
    checkboxSelection:true,
  },
  { 
    headerName: "Full name",
    field: 'names',
    sortable: true,
    editable:true,
},
  { 
    headerName: "Date of Birth",
    field: 'dob',
    editable: true,
    filter: "agDateColumnFilter"
},
  { 
    headerName: "Phone",
    field: 'mobile',
    editable: true,
    filter:"agNumberColumnFilter"
},
  { 
    headerName: "Roll no",
    field: 'rollno'
},
  { 
    headerName: "Blood Group",
    field: 'bloodgrp'
}
];

public defaultColDef: ColDef = {
  editable: true,
      sortable: true,
      filter:true,
      floatingFilter: true,
      resizable: true,
      flex: 1,
      minWidth: 100
};

getdetails() {
  this.gridservice.getStudentsData().subscribe(result=>{
    this.rowData = result;
  })
}
onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
  this.getdetails();
}
onCellValueChanged(clientdata: any) {
  this.editedStudentData = clientdata.data;
  // console.log(this.editedClinicData);
  this.onSave();
}

onSave(){
  this.gridservice.updateData(this.editedStudentData, this.editedStudentData.id).subscribe(()=>{
    if(this.editedStudentData.status === "Failed"){
      this.notification.error("Please try again!!!");
  }else{
    this.notification.success("Successfully updated...")
  }})
}

onRowSelected(params: any) {
  const value = params;
  this.showDelete = true;
  this.selectedId = value.data.id;
  this.editingId = value.data.id;
}

onDelete() {
  this.gridservice.deleteData(this.selectedId).subscribe(() => {
    this.notification.success("deleted.");
    this.getdetails();
  });
}


clearSelection(): void {
  this.agGrid.api.deselectAll();
}

}
