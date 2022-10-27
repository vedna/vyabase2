import { JsonObject , JsonProperty } from "json2typescript";

@JsonObject("CalenderMaster")
export class CalenderMaster{
    [x:string]:any;
    @JsonProperty("id", String)
    id: string="";

    @JsonProperty("titlename", String)
    titlename:string = "";

    @JsonProperty("strtDate", String)
    strtDate:string = "";

    @JsonProperty("endDate", String)
    endDate:string = "";

    @JsonProperty("primaryClr", String)
    primaryClr:string = "";

    @JsonProperty("textColor", String)
    textColor:string = "";

}