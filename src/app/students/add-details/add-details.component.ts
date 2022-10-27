import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../service/student.service';
import * as UUID from "uuid";
import { StudentMaster } from '../student-master.model';
import { StudentObjectBuilder } from '../student-object-builder';
// import { StudentObjectBuilder } from '../student-object-builder';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit {

  studentForm: FormGroup ;
  alertMsg: boolean | undefined = undefined;
  submitted: boolean = false;
  isEditEnabled: boolean = false;
  // private studentModel:StudentMaster
  constructor( 
    private fb:FormBuilder,
    private router:Router,
    private notification: ToastrService, 
    private studentService:StudentService
    ) {
    this.studentForm=this.fb.group({});
   }

  ngOnInit(): void {
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

  generateUUID() {
    const generatedId = UUID.v4();
    this.studentForm.patchValue({
      id: generatedId
    });
  }

  onFormSubmit(data:any){
    this.submitted = true;

    if (this.studentForm.invalid) {
      this.notification.error("Fill all the required fields");
      return;
    }
    
    if(this.studentForm.valid){
      this.notification.success("Successfully saved...")
    }else{
      this.notification.error("Something went wrong. Try again later...");
    }

    const studentMaster: StudentMaster = StudentObjectBuilder.create(data);

    this.studentService.postAppointmentData(studentMaster).subscribe(()=>{
      this.router.navigate(["/students"]);
    })

  };

  clearForm(){
    this.studentForm.reset();
  }

  get f() {
    return this.studentForm.controls;
  }


}
