import { Component, OnInit } from '@angular/core';
// , ChangeDetectionStrategy, ViewChild, TemplateRef
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalenderService } from '../../service/calender.service';
import { ToastrService } from 'ngx-toastr';
import { CalenderMaster } from '../calender-master.model';
import { CalenderObjectBuilder } from '../calender-object-builder';
import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: { 
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendercomp',
  templateUrl: './calendercomp.component.html',
  styleUrls: ['./calendercomp.component.scss']
})

export class CalendercompComponent implements OnInit {
 // @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

 view: CalendarView = CalendarView.Month;
 CalendarView = CalendarView;
 viewDate: Date = new Date();

 calenderForm: FormGroup ;
 submitted: boolean = false;
 calenderMaster:CalenderMaster = new CalenderMaster();
 getParamid:any;
 id:any;

 public rowData: any[] = [];

 modalData: {
   action: string;
   event: CalendarEvent;
 };

 actions: CalendarEventAction[] = [
   {
     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
     a11yLabel: 'Edit',
     onClick: ({ event }: { event: CalendarEvent }): void => {
       console.log(event)
       // this.handleEvent('Edited', event);
     },
   },
   {
     label: '<i class="fas fa-fw fa-trash-alt"></i>',
     a11yLabel: 'Delete',
     onClick: ({ event }: { event: CalendarEvent }): void => {
       this.events = this.events.filter((iEvent) => iEvent !== event);
       // this.handleEvent('Deleted', event);
     },
   },
 ];

 refresh = new Subject<void>();

 events: CalendarEvent[] = [
   {
     start: subDays(startOfDay(new Date()), 1),
     end: addDays(new Date(), 1),
     title: 'A 3 day event',
     color: { ...colors.red },
     actions: this.actions,
     allDay: true,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
   },
   {
     start: startOfDay(new Date()),
     title: 'An event with no end date',
     color: { ...colors.yellow },
     actions: this.actions,
   },
   {
     start: subDays(endOfMonth(new Date()), 3),
     end: addDays(endOfMonth(new Date()), 3),
     title: 'A long event that spans 2 months',
     color: { ...colors.blue },
     allDay: true,
   },
   {
     start: addHours(startOfDay(new Date()), 2),
     end: addHours(new Date(), 2),
     title: 'A draggable and resizable event',
     color: { ...colors.yellow },
     actions: this.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
   },
 ];

 activeDayIsOpen: boolean = true;

 constructor(
  private fb:FormBuilder, 
  private router:Router, 
  private calenderService:CalenderService, 
  private notification: ToastrService,
  private route:ActivatedRoute,
  private modelService:ConfirmationModalService
  ) { 
  this.calenderForm=this.fb.group({});
 }

 ngOnInit(): void {
  if (this.route.snapshot.queryParamMap.get("editId")) {
    this.id = this.route.snapshot.queryParamMap.get("editId");
    this.getItemDetailsById(this.id);
  }

  this.calenderForm = this.fb.group({
    titlename: ["", Validators.required],
    strtDate: ["", Validators.required],
    endDate: ["", Validators.required],
    primaryClr: ["", Validators.required],
    textColor: ["", Validators.required],
  });

  this.calenderdetails();
 }
 
 onFormSubmit(data:any){
  this.submitted = true;

  const calenderMaster: CalenderMaster = CalenderObjectBuilder.create(data);

  if (this.calenderForm.invalid) {
    this.notification.error("Fill all the required fields");
    return;
  }
  if(this.calenderForm.valid){
    this.calenderService.createItemsDetails(calenderMaster).subscribe(()=>{
      this.calenderForm.reset();
      this.router.navigateByUrl("/calender");
      this.notification.success("Successfully saved...")
    })
  }else{
    this.notification.error("Something went wrong. Try again later...");
  }

};

calenderdetails() {
  this.calenderService.getAllDetails().subscribe(result=>{
    this.rowData = result;
    // console.log(result)
  })
}

getItemDetailsById(id: any) {
  this.calenderService.getSingleDetails(id).subscribe((data: any) => {
    if (data) {
    // this.warehouseMaster = data;
    this.updateEditView(data);
    }
  });
}
updateEditView(calenderMaster: any) {
  this.calenderForm.patchValue({
    titlename: calenderMaster.titlename,
    strtDate: calenderMaster.strtDate,
    endDate: calenderMaster.endDate,
    primaryClr: calenderMaster.primaryClr,
    textColor: calenderMaster.textColor,
  });
}

 dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
   if (isSameMonth(date, this.viewDate)) {
     if (
       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
       events.length === 0
     ) {
       this.activeDayIsOpen = false;
     } else {
       this.activeDayIsOpen = true;
     }
     this.viewDate = date;
   }
 }

 eventTimesChanged({ event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
   this.events = this.events.map((iEvent) => {
     if (iEvent === event) {
       return {
         ...event,
         start: newStart,
         end: newEnd,
       };
     }
     return iEvent;
   });
   // this.handleEvent('Dropped or resized', event);
 }

 handleEvent(action: string, event: CalendarEvent): void {
   this.modalData = { event, action };
 }

//  addEvent(): void {
//    this.events = [
//      ...this.events,
//      {
//        title: 'New event',
//        start: startOfDay(new Date()),
//        end: endOfDay(new Date()),
//        color: colors.red,
//        draggable: true,
//        resizable: {
//          beforeStart: true,
//          afterEnd: true,
//        },
//      },
//    ];
//  }

onDelete(id: any) {
  const modal = this.modelService.createConfirmationModal();
  modal.content.showConfirmationModal(
    "Delete confirmation",
    "Are you sure want to delete " + name + "?"
  );
  modal.content.onClose.subscribe((result: boolean) => {
        if (result === true) {
          this.calenderService.deleteItemsDetail(id).subscribe(result=>{
            if (result) {
              this.calenderdetails();
              this.notification.success("Successfully deleted...")
            }
          });
      }});
}


 setView(view: CalendarView) {
   this.view = view;
 }

 closeOpenMonthViewDay() {
   this.activeDayIsOpen = false;
 }

  clearForm(){
  this.calenderForm.reset();
  }

  get f() {
    return this.calenderForm.controls;
}


}
