import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { StudentService } from '../../service/student.service';
import { StudentMaster } from '../student-master.model';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  studentForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  isEditEnabled: boolean = false;
  getParamid:any;
  id:any;
  studentMaster: StudentMaster = new StudentMaster();


  constructor(
    private updateApi:StudentService, 
    private fb:FormBuilder,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get("editId")) {
      this.id = this.route.snapshot.queryParamMap.get("editId");
      this.getItemDetailsById(this.id);
    }
    this.studentForm = this.fb.group({
      names: [""],
      rollno: [""],
      dob: [""],
      gender: [""],
      bloodgrp: [""],
      emails: [""],
      mobile: [""],
      address: [""]
    });
  }
  getItemDetailsById(id: any) {
    this.updateApi.getSingleData(id).subscribe((data: any) => {
      if (data) {
      // this.warehouseMaster = data;
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

}
