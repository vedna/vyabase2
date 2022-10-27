import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef,GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import * as UUID from "uuid";
import { ProductsService } from '../../service/products.service';
import 'ag-grid-enterprise';
import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  public rowData: any[] = [];
  gridApi: any;
  frameworkComponents: {} = {};
  editedClinicData: any;
  selectedId: string = "";
  editingId: string = "";
  showDelete: boolean = false;
  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  // public sideBar: SideBarDef | string | string[] | boolean | null = {
  //   toolPanels: [
  //     {
  //       id: 'columns',
  //       labelDefault: 'Columns',
  //       labelKey: 'columns',
  //       iconKey: 'columns',
  //       toolPanel: 'agColumnsToolPanel',
  //     },
  //     {
  //       id: 'filters',
  //       labelDefault: 'Filters',
  //       labelKey: 'filters',
  //       iconKey: 'filter',
  //       toolPanel: 'agFiltersToolPanel',
  //     },
  //   ],
  //   position:'left',
  //   defaultToolPanel: 'filters'
  // };
  constructor(private productsservice:ProductsService, private notification: ToastrService, private modelService:ConfirmationModalService) { }

  ngOnInit(): void {
  }

  public columnDefs: ColDef[] = [
    {
      checkboxSelection:true,
    },
    { 
      headerName: "Product Type",
      field: 'productType',
      editable: true,
      cellEditor: "agSelectCellEditor",
      sortable: true,
      cellEditorParams: { 
        values: ["fruits", "vegetable", "greens"] 
      }
  },
    { 
      headerName: "product List",
      field: 'productList',
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: { 
        values: ["banana", "coconut", "potato","tomato","mint", "broccoli"] 
      }
  },
  { 
    headerName: "Quantiy",
    field: 'quantity',
    editable: true,
    filter:"agNumberColumnFilter"
  },
  { 
    headerName: "Units",
    field: 'unit',
    editable: true,
  },
  { 
    headerName: "Price",
    field: 'price',
    editable: true,
    filter:"agNumberColumnFilter"
  },

  ];

  public defaultColDef: ColDef = {
    resizable: true,
    filter:true,
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
  };

  
  
  getdetails() {
    this.productsservice.getAllDetails().subscribe(result=>{
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
    this.productsservice.updateItemsDetail(this.editedClinicData, this.editedClinicData.id).subscribe(()=>{
      if(this.editedClinicData.status === "Failed"){
        this.notification.error("Please try again!!!");
      }else{
        this.notification.warning("Successfully updated...")
      }
    })
  }

  onRowSelected(params: any) {
    const value = params;
    this.showDelete = true;
    this.selectedId = value.data.id;
    this.editingId = value.data.id;
  }

  onDelete() {
    const model=this.modelService.createConfirmationModal();
    model.content.showConfirmationModal(
      "Delete confirmation",
    "Are you sure want to delete " + name + "?"
    );

    model.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        this.productsservice.deleteItemsDetail(this.selectedId).subscribe(() => {
          this.notification.success("deleted.");
          this.getdetails();
        });
      }
})};

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}
