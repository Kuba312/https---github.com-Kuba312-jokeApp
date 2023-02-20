import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-joke-confirm',
  templateUrl: './remove-joke-confirm.component.html',
  styleUrls: ['./remove-joke-confirm.component.scss']
})
export class RemoveJokeConfirmComponent {
  

  constructor(
    private dialogRef: MatDialogRef<RemoveJokeConfirmComponent>) {
    dialogRef.disableClose = true;
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
