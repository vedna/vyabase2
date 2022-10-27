import * as UUID from "uuid";
import { ClinicModelMaster } from "./clinic-master.model";

export class ClinicObjectBuilder{
    constructor(){}
    public static create(data:any):ClinicModelMaster{
        const referenceId=UUID.v4();
        const clinicMaster:ClinicModelMaster=new ClinicModelMaster();
        clinicMaster.id=referenceId;
        clinicMaster.names=data.names;
        clinicMaster.gender=data.gender;
        clinicMaster.phone=data.phone;
        clinicMaster.dob=data.dob;
        clinicMaster.street=data.street;
        clinicMaster.city=data.city;
        clinicMaster.zipcode=data.zipcode;
        clinicMaster.insurance=data.insurance;
        clinicMaster.policyno=data.policyno;
        clinicMaster.medicalHistory=data.medicalHistory;
        return clinicMaster;
    }

}