import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClinicserviceService } from '../../service/clinicservice.service';
import * as UUID from "uuid";
import { ClinicModelMaster } from '../clinic-master.model';
import { ClinicObjectBuilder } from '../clinic-object-builder';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent implements OnInit {

  clinicForm: FormGroup ;
  alertMsg: boolean | undefined = undefined;
  submitted: boolean = false;
  isEditEnabled: boolean = false;

  constructor(
    private fb:FormBuilder, 
    private router:Router,
    private clinicService:ClinicserviceService,
    private notification: ToastrService) {
    this.clinicForm=this.fb.group({});
   }

  ngOnInit(): void {
    this.clinicForm = this.fb.group({
      names: ["", Validators.required],
      gender: ["default", Validators.required],
      phone: [""],
      dob: ["", Validators.required],
      street: [""],
      city: [""],
      zipcode: [""],
      insurance: [""],
      policyno: [""],
      medicalHistory: ["default", Validators.required],
    });
  }

  generateUUID() {
    const generatedId = UUID.v4();
    this.clinicForm.patchValue({
      id: generatedId
    });
  }

  onFormSubmit(data:any){
    this.submitted = true;

    if (this.clinicForm.invalid) {
      this.notification.error("Fill all the required fields");
      return;
    } else if(this.clinicForm.valid){
      this.notification.success("Successfully saved...")
    }else{
      this.notification.error("Something went wrong. Try again later...");
    }

    const clinicmasterRef:ClinicModelMaster=ClinicObjectBuilder.create(data);

    this.clinicService.postClinicDetails(clinicmasterRef).subscribe(()=>{
      this.router.navigateByUrl("/clinic");
    })
  };

  clearForm(){
    this.clinicForm.reset();
  }

  get f() {
    return this.clinicForm.controls;
  }

}
