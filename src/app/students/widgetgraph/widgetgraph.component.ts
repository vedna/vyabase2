import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { StudentService } from '../../service/student.service';
import { DateUtil } from '../data.util';
import { StudentMaster } from '../student-master.model';
// import { DateUtil } from '../data.util';

@Component({
  selector: 'app-widgetgraph',
  templateUrl: './widgetgraph.component.html',
  styleUrls: ['./widgetgraph.component.scss']
})
export class WidgetgraphComponent implements OnInit {

  dataset: any[];
  studentModel:StudentMaster[]=[];
  slickEventHandler: any;
  gridObj: any;
  alertWarning: string;
  id: string = "";
  rank: any[]=[];
  count: number = 0;

   // componenents
   listItems: any[] = [];

   //widgets
   totalStudentRecord:number;
   todaysRecord:number;
   thisMonthRecord:string;
   thisYearRecord:string;
   thisWeek: number | any;
   thisMonth: number | any;
   todayFilter: number | any;
   todayRecord2: number | any;
   today = moment().format("YYYY-MM-DD");
   datestartOfWeek = moment().startOf('week').format("DD-MMM-YYYY");
   dateEndOfWeek = moment().endOf('week').format("DD-MMM-YYYY");
   datestartOfMonth = moment().startOf('month').format("YYYY-MM-DD");
   dateEndOfMonth   = moment().endOf('month').format("YYYY-MM-DD");
   startOfyear = moment().startOf('year').format("YYYY-MM-DD");
   endOfYear = moment().endOf('year').format("YYYY-MM-DD");
 
   //chart
   Months: string[] = ["This Month"];
   chart: any;
   thisMonthDetailsFiltered:any[]=[];
   thisTodaysDetailsFiltered:any[]=[];
   dateOfToday =  moment().format('D');
   endOfMonth = moment().endOf('month').format('D');
   selectedMonth: string = "";
   monthFilter: string[] = ["Today","YesterDay", "Last 30 days"];

   // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData: any[] = [{ data: [] }];

  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    this.getAllDetails();
  }

  getAllDetails(){
    this.studentService.getStudentsData().subscribe(result=>{
      this.studentModel = result;

      const data:StudentMaster[]=result;
      this.studentModel = data.sort((a:any, b:any)=>(a.names > b.names?1:-1));

      //widgets
    this.totalStudentRecord = result.length;

     // This week
     const weekFiltered = result.filter((item: any) => moment(item.createdOn).format("DD-MMM-YYYY") >= this.datestartOfWeek && moment(item.createdOn).format("DD-MMM-YYYY") <= this.dateEndOfWeek);
     this.thisWeek = weekFiltered.length;

    //Today
    var today = result.filter(result=> result.createdOn >= this.today);
    this.todaysRecord = today.length;

    //This Month
    var thisMonth = result.filter(result=> result.createdOn >= this.datestartOfMonth && result.createdOn <= this.dateEndOfMonth );
    this.thisMonthRecord = thisMonth.length;

    //This Year
    var thisYear = result.filter(result=> result.createdOn >= this.startOfyear && result.createdOn <= this.endOfYear );
    this.thisYearRecord = thisYear.length;

    this.getData("Last 30 days");
    })
  }

  getData(filter:any){

    // if (filter === "Today") {
    //   const toDays:any[]=[];
    //   for(let days = parseInt(this.dateOfToday); days<=parseInt(this.dateEndOfMonth); days++){
    //       toDays.push(moment().date(days).format('D'))
    //   const todayRecord = this.studentModel.filter(a => a.createdOn === DateUtil.toJsonFormat(moment().date(days).format("YYYY-MM-DD")));
    //   this.thisTodaysDetailsFiltered.push(todayRecord.length)
    //   if(todayRecord === toDays){
    //     this.barChartData = [
    //       {
    //         data: toDays,
    //         label: 'ListItems'
    //       }
    //     ];
    //     // this.barChartLabels = toDays;
    //   }
    // }}

    if (filter === "Today") {
      const todayValues: any[] = [];
      const todayRecord = this.studentModel.filter(item=> item.createdOn === DateUtil.toJsonFormat(moment().format("YYYY-MM-DD")));
      todayValues.push(todayRecord.length)
      this.barChartData = [
        {
          data: todayValues,
          label: 'List Items'
        }
      ];
  }

    if (filter === "YesterDay") {
      const yesterdayValues: any[] = [];
      const YesterdaysRecord = this.studentModel.filter(item=>item.createdOn === DateUtil.toJsonFormat( moment().subtract(1,"days").format("YYYY-MM-DD")));
      yesterdayValues.push(YesterdaysRecord.length)
      this.barChartData = [
        {
          data: yesterdayValues,
          label: 'List Items'
        }
      ];
    }
    
    if (filter === "Last 30 days") {
    const days:any[]=[];
    for(let day=1; day<=parseInt(this.endOfMonth); day++){
      days.push(moment().date(day).format("D"));
      const thisMonthFiltered = this.studentModel.filter(item=>item.createdOn == DateUtil.toJsonFormat(moment().date(day).format("YYYY-MM-DD")));
      this.thisMonthDetailsFiltered.push(thisMonthFiltered.length);
      this.barChartData = [
        {
          label:'List Items',
          data: this.thisMonthDetailsFiltered
        }
      ];
      this.barChartLabels = days;
    }
  }
  }

}
