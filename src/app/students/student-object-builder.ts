import moment from "moment";
import * as UUID from "uuid";
import { StudentMaster } from "./student-master.model";
import { DateUtil } from "./data.util";


export class StudentObjectBuilder{
    constructor(){}
    public static create(data:any):StudentMaster{
    const referenceId = UUID.v4();
    const studentMaster:StudentMaster = new StudentMaster();
    studentMaster.modifiedBy = ["studentmaster"]["names"];
    studentMaster.modifiedOn = DateUtil.toJsonFormat(moment().format());

    studentMaster.createdBy = ["studentmaster"]["names"];
    studentMaster.createdOn = DateUtil.toJsonFormat(moment().format("YYYY-MM-DD"));
        // profile
        studentMaster.id =referenceId;
        studentMaster.names = data.names;
        studentMaster.rollno = data.rollno;
        studentMaster.dob = DateUtil.toJsonFormat(data.dob);
        studentMaster.dob = data.dob;
        studentMaster.gender = data.gender;
        studentMaster.bloodgrp = data.bloodgrp;
        studentMaster.emails = data.emails;
        studentMaster.mobile = data.mobile;
        studentMaster.address = data.address;
        return studentMaster;
    }
    // public static upload(data:any): StudentMaster {
    //     const studentMaster:StudentMaster = new StudentMaster();
    //     const referenceId = uuid();
    //     studentMaster.names = data["names"];
    //     studentMaster.rollno = data["rollno"];
    //     studentMaster.dob = data["dob"];
    //     studentMaster.gender = data["gender"];
    //     studentMaster.bloodgrp = data["bloodgrp"];
    //     studentMaster.emails = data["emails"];
    //     studentMaster.mobile = data["mobile"];
    //     studentMaster.address = data["address"];
    // }
}

