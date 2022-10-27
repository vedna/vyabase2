import { Any, JsonObject , JsonProperty } from "json2typescript";

@JsonObject("StudentMaster")
export class StudentMaster{
    [x:string]:any;
    @JsonProperty("id", String)
    id: string="";

    @JsonProperty("names", String)
    names:string = "";

    @JsonProperty("rollno", String)
    rollno:string = "";

    @JsonProperty("dob", String)
    dob:string = "";

    @JsonProperty("gender", [String])
    gender:string[] =[];

    @JsonProperty("bloodgrp", String)
    bloodgrp:string = "";

    @JsonProperty("emails", Any)
    emails:any = undefined;

    @JsonProperty("mobile", Number)
    mobile:number = undefined;

    @JsonProperty("address", String)
    address:string = "";
}