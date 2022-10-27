import { Component, OnInit } from '@angular/core';
// import { AngularGridInstance, Column, Editors, formatNumber,  GridOption } from 'angular-slickgrid';

@Component({
  selector: 'app-slick',
  templateUrl: './slick.component.html',
  styleUrls: ['./slick.component.scss']
})

export class SlickComponent implements OnInit {
  

  constructor(){}

  ngOnInit(): void {
  }

  // angularGridReady(angularGrid: AngularGridInstance) {
  //   // this.angularGrid = angularGrid;
  //   // this.gridObj = angularGrid.slickGrid;
  // }

  // highlightRow(event: Event, isMouseEnter: boolean) {
  //   const cell = this.gridObj.getCellFromEvent(event);
  //   const rows = isMouseEnter ? [cell.row] : [];
  //   this.gridObj.setSelectedRows(rows); // highlight current row
    // event.preventDefault();
  }

  // prepareDataGrid() {
    // this.columnDefinitions = [
    //   {
    //     id: 'id', name: 'id', field: 'id',
    //     minWidth:50, width: 30,
    //     cannotTriggerInsert: true,
    //     resizable: true,
    //     unselectable: true,
    //     editor: {
    //       model: Editors.text,
    //       required: true,  
    //          },    
    //   },
    //   {
    //     id: 'eqptCode', name: 'Equipment code', field: 'eqptCode',
    //     minWidth: 150, width: 80,
    //     filterable: true,
    //     resizable: true,
    //     sortable: true,
    //     editor: {
    //       model: Editors.text,
    //       required: true,  
    //         },
    //   }
    // ];
  // }

  // gridOptions = {
  //   autoResize: {
  //     containerId: 'demo-container',
  //     sidePadding: 30
  //   },
  //   enableExcelCopyBuffer: true,
  //   enableCellNavigation: true,
  //   editable: true,
  //   autoEdit: true,
  //   asyncEditorLoading: true,
  //   enableColumnReorder: true,
  //   gridMenu: { hideClearFrozenColumnsCommand: false },
  //   headerMenu: { hideFreezeColumnsCommand: false }
  // };

  // isNullUndefinedOrEmpty(data: any) {
  //   return (data === '' || data === null || data === undefined);
  // }

  // onValidationError(_e: Event, args: any) {
  //   alert(args.validationResults.msg);
  // }

//   getData() {
//     this.dataService.getAllJobPlanDetails("").subscribe((result: any) => {
//       result.map((item:any)=>{
//         item.id = item.eqptCode;
//         this.dataset.push(item)
//       })
//     }
// }
// }
