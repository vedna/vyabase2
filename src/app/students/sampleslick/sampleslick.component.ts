import { Component, OnInit } from '@angular/core';
import { 
  AngularGridInstance, 
  Column,Editors,FieldType,
  Filters,
  Formatters,GridOption, 
  OnEventArgs,
  // Filters,
} from 'angular-slickgrid';
import { StudentService } from '../../service/student.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';
import moment from 'moment';
import { StudentMaster } from '../student-master.model';
import { DateUtil } from '../data.util';


declare const Slick: any;
@Component({
  selector: 'app-sampleslick',
  templateUrl: './sampleslick.component.html',
  styleUrls: ['./sampleslick.component.scss']
})

export class SampleslickComponent implements OnInit {

  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset: any[];
  studentModel:StudentMaster[]=[];
  slickEventHandler: any;
  angularGrid: AngularGridInstance;
  gridObj: any;
  alertWarning: string;
  id: string = "";

  complexityLevelList = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  //widgets
  totalStudentRecord:number;
  todaysRecord:string;
  thisMonthRecord:string;
  thisYearRecord:string;
  today = moment().format("YYYY-MM-DD");
  datestartOfMonth = moment().startOf('month').format("YYYY-MM-DD");
  dateEndOfMonth   = moment().endOf('month').format("YYYY-MM-DD");
  startOfyear = moment().startOf('year').format("YYYY-MM-DD");
  endOfYear = moment().endOf('year').format("YYYY-MM-DD");

  //chart
  Months: string[] = ["This Month"];
  chart: any;
  thisMonthDetailsFiltered:any[]=[];
  dateOfToday =  moment().format('D');
  endOfMonth   = moment().endOf('month').format('D');


  // nameListLength: number | undefined = undefined;
  constructor(
    private studentService:StudentService, 
    private notification:ToastrService, 
    private confirmationModel:ConfirmationModalService,
    ) { 
    this.slickEventHandler = new Slick.EventHandler();
  }

  ngOnInit(): void {
    this.studentService.getStudentsData().subscribe(result=>{
      this.studentModel = result.sort((a: any, b: any) => (a.names > b.names ? 1 : -1));

    //widgets
    this.totalStudentRecord = result.length;

    //Today
    var today = result.filter(result=> result.createdOn >= this.today);
    this.todaysRecord = today.length;

    //This Month
    var thisMonth = result.filter(result=> result.modifiedOn >= this.datestartOfMonth && result.createdOn <= this.dateEndOfMonth );
    this.thisMonthRecord = thisMonth.length;

    //This Year
    var thisYear = result.filter(result=> result.createdOn >= this.startOfyear && result.createdOn <= this.endOfYear );
    this.thisYearRecord = thisYear.length;
       // data length for widget
       // this.nameListLength = this.dataset.length;
   })
    this.prepareDataGrid();
    this.getDetails();
  }

  public angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    }

  prepareDataGrid() {
    this.columnDefinitions =[
      {
        id: 'edit',
        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        formatter: Formatters.editIcon,
        minWidth: 30,
        maxWidth: 30,
        // use onCellClick OR grid.onClick.subscribe which you can see down below
        onCellClick: (_e: Event, args: OnEventArgs) => {
          console.log(args);
          this.alertWarning = `Editing: ${args.dataContext.id}`;
          this.angularGrid.gridService.highlightRow(args.row, 1500);
          this.angularGrid.gridService.setSelectedRow(args.row);
        }
      },
      {
        id: "delete",
        field: "id",
        excludeFromHeaderMenu: true,
        formatter: Formatters.deleteIcon,
        minWidth: 30,
        maxWidth: 30,
        onCellClick: (_e: Event, args: OnEventArgs) => {
          // console.log(e, args);
          this.deleteConfirmation(args.dataContext.id);
        }
      },
      { 
        id: 'name', 
        name: 'Full name', 
        field: 'names', 
        filterable: true,
        sortable: true,
        type:  FieldType.string, editor: { model: Editors.text,  minValue: 0,
          maxValue: 100, required: true }
    },
      { 
        id: 'date', 
        name: 'Date of Birth', 
        field: 'dob', 
        filterable: true,
        sortable: true,
        filter: { model: Filters.dateRange },
        // formatter: Formatters.multiple,
        params: {
          formatters: [ Formatters.dateIso]
        },
        exportWithFormatter: true,
        type: FieldType.date,
        editor: {
          model: Editors.date,
        },
    },
      { 
        id: 'phone', 
        name: 'Phone', 
        field: 'mobile', 
        filterable: true,
        sortable: true,
        type: FieldType.string, editor:{model:Editors.integer, maxLength:10}
    },
    {
      id: 'gender', 
      name: 'Gender', 
      field: 'gender', 
        type: FieldType.string,
        sortable: true, filterable: true,
        
        // columnGroup: 'Analysis',
        // formatter: (_row, _cell, value) => this.complexityLevelList[value].label,
        // exportCustomFormatter: (_row, _cell, value) => this.complexityLevelList[value].label,
        // filter: {
        //   model: Filters.multipleSelect,
        //   collection: this.complexityLevelList
        // },
        // editor: {
        //   model: Editors.singleSelect,
        //   collection: this.complexityLevelList,
        //   massUpdate: true
        // },
      // formatter: Formatters.bsDropdown,
      // params: { label: 'Gender' },
      // filter: {
      //   collection: [
      //     { value: "", labelKey: "Select Gender" },
      //     { value: "male", labelKey: "Male" },
      //     { value: "female", labelKey: "Female" }
      //   ],
      //   // model: Filters.multipleSelect
      // },
      // onCellClick: (_e: Event, args: OnEventArgs) => {;
      //   this.bsDropdown.render({
      //     component:CustomActionFormatterComponent ,
      //     args,
      //     offsetLeft: 92,
      //     offsetDropupBottom: 15,
      //     parent: this, // provide this object to the child component so we can call a method from here if we wish
      //   });
      // }

      formatter: () => `<div class="fake-hyperlink">Gender <i class="fa fa-caret-down"></i></div>`,
        cellMenu: {
          commandItems: [
            {
              command:'gender',
              title:'male',
            },
            {
              command:'gender',
              title:'female',
              action: (_event, args)=> this.angularGrid.gridService.updateItems(this.id, args.dataContext.id)
            },
          ]
        },

    },
      { 
        id: 'rollno', 
        name: 'Roll no', 
        field: 'rollno', 
        filterable: true,
        sortable: true, 
        type: FieldType.string, editor:{model:Editors.text}
    }
    ];


    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      enableFiltering: true,
      enableCellNavigation: true,
      createPreHeaderPanel: true,
      showPreHeaderPanel: true,
      preHeaderPanelHeight: 25,
      editable: true,
      autoEdit: true,
      enableRowSelection: true,
      enableCheckboxSelector: true,
      checkboxSelector: {
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },
      rowSelectionOptions: {
        selectActiveRow: false
      },

      enableCellMenu: true
    };
  }


  getDetails(){
      this.studentService.getStudentsData().subscribe( result=>{
          this.dataset = result;
          this.getData();
    })}

    getData(){
      // this.barChartLabels = [];
      const days: any[] = [];
        for (let day =1; day <= parseInt(this.endOfMonth); day++) {
          days.push(moment().date(day).format("D"));
  
          const thisMonthDetailsFiltered = this.studentModel.filter(item =>item.createdOn == DateUtil.toJsonFormat(moment().date(day).format("YYYY-MM-DD")));
  
          this.thisMonthDetailsFiltered.push(thisMonthDetailsFiltered.length);
        }
      }
    

  onCellChanged(_e: Event, args: any) {
    // console.log(e, args, this.id);
    const data = args.item;
    delete data.assignedTo;
    this.id=data.id;
    // console.log(this.id);

    this.studentService.updateData(data, this.id).subscribe((res)=>{
      if(res){
        // console.log(res);
        this.notification.success("Successfully updated");
      }
    }, (err:any)=>{
      if(err){
        this.notification.error("Error", "");
      }
    });
  }

  deleteConfirmation(id:any){
    const model = this.confirmationModel.createConfirmationModal();
    model.content.showConfirmationModal(
      "Delete confirmation",
      "Are you sure want to delete " + name + "?"
    )
    model.content.onClose.subscribe((result:boolean)=>{
      if(result===true){
        this.studentService.deleteData(id).subscribe((res)=>{
          if(res){
            this.getDetails();
            this.notification.warning("Deleted", "");
          }
        })
      }
    })
  }

}


