import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("productMaster")
export class ProductModelMaster{
    [x:string]:any;
    @JsonProperty("id", String)
    id:string="";

    @JsonProperty("productType", [String])
    productType:string[]=[];

    @JsonProperty("productList", [String])
    productList:string[]=[];

    @JsonProperty("quantity", String)
    quantity:string="";

    @JsonProperty("unit", String)
    unit:string="";

    @JsonProperty("price", Number)
    price:number=undefined;

}