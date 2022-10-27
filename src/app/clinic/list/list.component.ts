import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef,GridReadyEvent, } from 'ag-grid-community';
import { ClinicserviceService } from '../../service/clinicservice.service';
import { ToastrService } from 'ngx-toastr';
import * as UUID from "uuid";
import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public rowData: any[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  selectedId: string = "";
  editingId: string = "";
  showDelete: boolean = false;
  frameworkComponents: {} = {};
  editedClinicData: any;
   
  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  gridApi: any;

  constructor(private clinicservice:ClinicserviceService, private notification: ToastrService, private modelService:ConfirmationModalService) {
   }

  ngOnInit(): void {
    this.getdetails();
  }

  public columnDefs: ColDef[] = [
    {
      checkboxSelection:true,
    },
    { 
      headerName: "Patient Name",
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
    field: 'phone',
    editable: true,
    filter:"agNumberColumnFilter"
},
    { 
      headerName: "Insurance",
      field: 'insurance',
      editable: true
  },
    { 
      headerName: "Medical History",
      field: 'medicalHistory',
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { 
        values: ["anemia", "asthama", "diabetes","others / no"] 
      }
  }
  ];

  public defaultColDef: ColDef = {
    resizable: true,
    filter:true,
    flex: 1,
    minWidth: 100,
  };

  
  getdetails() {
    this.clinicservice.getClinicDetails().subscribe(result=>{
      this.rowData = result;
    })
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getdetails();
  }

  onCellValueChanged(clientdata: any) {
    this.editedClinicData = clientdata.data;
    this.onSave();
  }
  generateUUID(){
   const generatedId= UUID.v4();
   this.editedClinicData.patchValue({
    id:generatedId
   });
  }

  onSave(){
    this.clinicservice.updateDetails(this.editedClinicData, this.editedClinicData.id).subscribe(()=>{
      if(this.editedClinicData.status === "Failed"){
        this.notification.error("Please try again!!!");
      }else{
        this.notification.success("Successfully updated...")
      }
    })
  }

  onRowSelected(params: any) {
    const value = params;
    this.showDelete = true;
    this.selectedId = value.data.id;
    this.editingId = value.data.id;
  }

//   onDelete() {
//     this.clinicservice.deleteDetails(this.selectedId).subscribe(() => {
//       this.notification.success("deleted.");
//       this.getdetails();
//     });
// }
onDelete() {
  const modal = this.modelService.createConfirmationModal();
  modal.content.showConfirmationModal(
    "Delete confirmation",
    "Are you sure want to delete " + name + "?"
  );
  modal.content.onClose.subscribe((result: boolean) => {
        if (result === true) {
          this.clinicservice.deleteDetails(this.selectedId).subscribe(() => {
            this.notification.success("deleted.");
            this.getdetails();
          });
      }});
}

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}
