import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../interfaces/item.interface';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  currencyInputMask = createMask({
    alias: 'numeric',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
  });

  dateInputMask = createMask<Date>({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
    parser: (value: string) => {
      const values = value.split('/');
      const year = +values[2];
      const month = +values[1] - 1;
      const date = +values[0];
      return new Date(year, month, date);
    },
  });
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    type: new FormControl('2', [Validators.required]),
    money: new FormControl(0, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateItemComponent>,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    console.log(new Date());
  }

  salvar() {
    const item: Item = {
      nome: this.form.controls.name.value as string,
      data: this.form.controls.date.value as Date,
      tipo: Number(this.form.controls.type.value),
      valor: this.form.controls.money.value as number,
    };

    console.log(item);

    this.itemService.add(item).subscribe(() => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
