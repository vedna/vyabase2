import moment from "moment";
import * as UUID from 'uuid';
import { CalenderMaster } from "./calender-master.model";
import { DateUtil } from "../students/data.util";

export class CalenderObjectBuilder{
    constructor(){}
    public static create(data:any):CalenderMaster{
    const referenceId = UUID.v4();
    const calenderMaster:CalenderMaster = new CalenderMaster();
    calenderMaster.modifiedBy = ["calenderMaster"]["titlename"];
    calenderMaster.modifiedOn = DateUtil.toJsonFormat(moment().format());

    calenderMaster.createdBy = ["calenderMaster"]["titlename"];
    calenderMaster.createdOn = DateUtil.toJsonFormat(moment().format("YYYY-MM-DD"));
        // profile
        calenderMaster.id =referenceId;
        calenderMaster.titlename = data.titlename;
        calenderMaster.primaryClr = data.primaryClr;
        calenderMaster.textColor = data.textColor;
        
        calenderMaster.strtDate = data.strtDate;
        calenderMaster.endDate = data.endDate;
        return calenderMaster;
    }
}