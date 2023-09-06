import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/shared/services/item.service';
import { Item } from '../../interfaces/item.interface';
import { createMask } from '@ngneat/input-mask';
import { MessageService } from '../../services/message.service';

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
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    type: new FormControl('2', [Validators.required]),
    money: new FormControl(0, [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateItemComponent>,
    private itemService: ItemService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.editItem(this.data);
    }
  }
  editItem(data: Item) {
    this.form.controls.name.setValue(data.nome);
    this.form.controls.money.setValue(data.valor);
    this.form.controls.date.setValue(new Date(data.data));
    this.form.controls.type.setValue(data.tipo.toString());
  }

  salvar() {
    const item: Item = {
      nome: this.form.controls.name.value as string,
      data: this.form.controls.date.value as Date,
      tipo: Number(this.form.controls.type.value),
      valor: this.form.controls.money.value as number,
    };
    if (this.data) {
      item.id = this.data.id;
    }
    this.itemService.add(item).subscribe(() => {
      this.message.showMessage('item salvo com sucesso');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
