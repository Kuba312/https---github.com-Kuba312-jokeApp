import { Injectable } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor(private _snackBar: MatSnackBar) { }


  openMessageBar(message: string, type: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [type]
    });
  }
}