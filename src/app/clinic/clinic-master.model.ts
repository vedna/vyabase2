import {JsonObject, JsonProperty } from "json2typescript";

@JsonObject("clinicMaster")
export class ClinicModelMaster{
    [x:string]:any;
    @JsonProperty("id", String)
    id:string="";

    @JsonProperty("names", String)
    names:string="";

    @JsonProperty("gender", [String])
    gender:string[]=[];

    @JsonProperty("phone", Number)
    phone:number=undefined;

    @JsonProperty("dob", String)
    dob:string="";

    @JsonProperty("street", String)
    street:string="";

    @JsonProperty("city", String)
    city:string="";

    @JsonProperty("zipcode", Number)
    zipcode:number=undefined;

    @JsonProperty("insurance", String)
    insurance:string="";
    
    @JsonProperty("policyno", String)
    policyno:string="";

    @JsonProperty("medicalHistory", [String])
    medicalHistory:string[]=[];

}