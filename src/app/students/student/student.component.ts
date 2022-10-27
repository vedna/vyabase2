import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';
import { StudentService } from '../../service/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  // checkbox 
  isChecked: boolean | undefined = false;
  id: string = "";
  checkedIdList: any[] = [];
  constructor(private studentApi:StudentService, 
    private router:Router,
    private modelService: ConfirmationModalService,
    private notification:ToastrService
    ) { }
  appointment:any;
  
  ngOnInit(): void {
    this.studentsData();
  }

  studentsData(){
    this.studentApi.getStudentsData().subscribe(result=>{
      this.appointment = result;
      // console.warn(result);
    })
  }

  getSelectedId(isCheckedStatus: boolean, id: string) {
    if (isCheckedStatus === true) {
      this.id = id;
      this.isChecked = isCheckedStatus;
      this.checkedIdList.push(this.id);
    } else {
      this.isChecked = undefined;
      this.id = "";
      const index = this.checkedIdList.indexOf(this.id);
      this.checkedIdList.splice(index);
    }
  }

  deleteStudent(id: any) {
    const modal = this.modelService.createConfirmationModal();
    modal.content.showConfirmationModal(
      "Delete confirmation",
      "Are you sure want to delete " + name + "?"
    );
    modal.content.onClose.subscribe((result: boolean) => {
          if (result === true) {
            this.studentApi.deleteData(id).subscribe(result=>{
              if (result) {
                this.studentsData();
                this.notification.success("Successfully deleted...")
              }
            });
        }});
  }


  // id:any
  // deleteStudent() {
  //   this.dialogService.openConfirmDialog().afterClosed().
  // this.studentApi.deleteData(id).subscribe(_result=>{
  //     this.studentsData();
  // });
// }
  // deleteStudent(id:any) {
  //   const modal = this.modelService.createConfirmationModal();
  //   modal.content.showConfirmationModal(
  //     "Delete confirmation",
  //     "Are you sure want to delete " + name + "?"
  //   );
    
  //   modal.content.onClose.subscribe((result: boolean) => {
  //     if (result === true) {
  //       // when pressed Yes
  //       this.studentApi.deleteData(id).subscribe(result=>{
  //         if (result) {
  //           this.studentsData();
  //         }
  //       });
  //   }});
  // }

  onEdit(id: any) {
    this.router.navigate(["/students/edit-student"], {
      queryParams: { editId: id }
    });
  }

  onView(id: any) {
    this.router.navigate(["/students/view-student"], {
      queryParams: { editId: id }
    });
  }


 
}
