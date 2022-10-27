import * as UUID from "uuid";
import { ProductModelMaster } from "./productmaster.model";

export class ProductObjectBuilder{
    constructor(){}
    public static create(data:any):ProductModelMaster{
        const referenceId=UUID.v4();
        const productMaster:ProductModelMaster=new ProductModelMaster();
        productMaster.id=referenceId;
        productMaster.productType=data.productType;
        productMaster.productList=data.productList;
        productMaster.quantity=data.quantity;
        productMaster.unit=data.unit;
        productMaster.price=data.price;
        return productMaster;
    }

}