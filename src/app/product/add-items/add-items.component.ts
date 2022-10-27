import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as UUID from "uuid";
import { ProductModelMaster } from '../productmaster.model';
import { ProductsService } from '../../service/products.service';
import { ProductObjectBuilder } from '../product-object-builder';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  itemsForm:FormGroup;
  alertMsg: boolean | undefined = undefined;
  submitted: boolean = false;
  isEditEnabled: boolean = false;

  constructor(
    private fb:FormBuilder, 
    private router:Router,
    private notification: ToastrService,
    private productService:ProductsService,
  ) { }

  ngOnInit(): void {
    this.itemsForm = this.fb.group({
      productType: ["", Validators.required],
      productList: ["", Validators.required],
      quantity: [""],
      unit: [""],
      price: [""],
    });
  }

  generateUUID() {
    const generatedId = UUID.v4();
    this.itemsForm.patchValue({
      id: generatedId
    });
  }

  onFormSubmit(data:any){
    this.submitted = true;

    if (this.itemsForm.invalid) {
      this.notification.error("Fill all the required fields");
      return;
    } else if(this.itemsForm.valid){
      this.notification.success("Successfully saved...")
    }else{
      this.notification.error("Something went wrong. Try again later...");
    }

    const itemsMasterRef:ProductModelMaster = ProductObjectBuilder.create(data);

    this.productService.createItemsDetails(itemsMasterRef).subscribe(()=>{
      this.router.navigateByUrl("/product");
    })
  };

  clearForm(){
    this.itemsForm.reset();
  }

  get f() {
    return this.itemsForm.controls;
  }

}
