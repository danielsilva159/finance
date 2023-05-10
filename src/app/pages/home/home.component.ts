import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from 'src/app/shared/dialog/create-item/create-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}
  addItem() {
    this.dialog.open(CreateItemComponent, {});
  }
}
