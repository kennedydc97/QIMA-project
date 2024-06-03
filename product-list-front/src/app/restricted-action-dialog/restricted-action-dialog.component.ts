import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restricted-action-dialog',
  templateUrl: './restricted-action-dialog.component.html',
  styleUrls: ['./restricted-action-dialog.component.css']
})
export class RestrictedActionDialogComponent {

  constructor(public dialogRef: MatDialogRef<RestrictedActionDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
