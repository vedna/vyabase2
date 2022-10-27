import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentService } from '../../service/student.service';
import { ToastrService } from 'ngx-toastr';
import { StudentMaster } from '../student-master.model';
import * as UUID from "uuid";


@Component({
  selector: 'app-edit-appoint',
  templateUrl: './edit-appoint.component.html',
  styleUrls: ['./edit-appoint.component.scss']
})
export class EditAppointComponent implements OnInit {

  studentForm: FormGroup = new FormGroup({});
  alertMsg: boolean | undefined = undefined;
  submitted: boolean = false;
  isEditEnabled: boolean = false;
  getParamid:any;
  id:any;
  studentMaster: StudentMaster = new StudentMaster();

  constructor(
    private updateApi:StudentService, 
    private fb:FormBuilder, 
    private notification: ToastrService,
    private router:Router, 
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get("editId")) {
      this.id = this.route.snapshot.queryParamMap.get("editId");
      this.getItemDetailsById(this.id);
    }
    this.studentForm = this.fb.group({
      names: ["", Validators.required],
      rollno: ["", Validators.required],
      dob: ["", Validators.required],
      gender: ["default", Validators.required],
      bloodgrp: ["", Validators.required],
      emails: ["", Validators.required],
      mobile: ["", Validators.required],
      address: ["", Validators.required]
    });
  }


  getItemDetailsById(id: any) {
    this.updateApi.getSingleData(id).subscribe((data: any) => {
      if (data) {
      this.updateEditView(data);
      }
    });
  }

  updateEditView(studentMaster: any) {
    this.studentForm.patchValue({
      names: studentMaster.names,
      rollno: studentMaster.rollno,
      dob: studentMaster.dob,
      gender: studentMaster.gender,
      bloodgrp: studentMaster.bloodgrp,
      emails: studentMaster.emails,
      mobile: studentMaster.mobile,
      address: studentMaster.address,
    });
  }
  generateUUID() {
    const generatedId = UUID.v4();
    this.studentForm.patchValue({
      id: generatedId
    });
  }

  onSubmit(data:any){
    this.submitted = true;
    if (this.studentForm.invalid) {
      this.notification.error("Fill all the required fields");
      return;
    }
    if(this.studentForm.valid){
      this.notification.success("Updated successfully", this.studentForm.value.names);
    } else{
      this.notification.error("Something went wrong please try again later");
    }

    this.studentMaster.names = data.names;
    this.studentMaster.rollno = data.rollno;
    this.studentMaster.dob = data.dob;
    this.studentMaster.gender = data.gender;
    this.studentMaster.bloodgrp = data.bloodgrp;
    this.studentMaster.emails = data.emails;
    this.studentMaster.mobile = data.mobile;
    this.studentMaster.address = data.address;
    this.updateApi.updateData(this.studentForm.value,this.id).subscribe((_result)=>{
      this.router.navigate(['/students']);
    })
  };
  
  get f() {
    return this.studentForm.controls;
  }

}
