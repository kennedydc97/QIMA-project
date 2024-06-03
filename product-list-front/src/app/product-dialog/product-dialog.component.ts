import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
})
export class ProductDialogComponent {

  action: string;
  productData: any;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productData = { ...data };
    this.action = this.productData.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.productData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }


  
}
