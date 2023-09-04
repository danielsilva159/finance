import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
