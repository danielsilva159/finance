import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from 'src/app/shared/dialog/create-item/create-item.component';
import { Item } from 'src/app/shared/interfaces/item.interface';
import Mouth from './mouth';
import { FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'valor', 'data', 'tipo', 'acoes'];
  dataSource: Item[] = [];
  receita: number = 0;
  dispesa: number = 0;
  total = 0;
  meses = Mouth.prototype.config();
  mesSelecionada = this.meses.find(
    (mes) => new Date().getMonth() + 1 === mes.value
  );
  selected = new FormControl(this.mesSelecionada?.value, [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  constructor(private dialog: MatDialog, private itemService: ItemService) {}
  ngOnInit(): void {
    this.listar();
  }

  addItem() {
    this.dialog
      .open(CreateItemComponent, {})
      .afterClosed()
      .subscribe(() => {
        this.listar();
      });
  }

  listar() {
    if (this.mesSelecionada) {
      this.receita = 0;
      this.dispesa = 0;
      this.itemService
        .list(this.mesSelecionada.value)
        .subscribe((data: any) => {
          this.dataSource = data;
          data.forEach((item: any) => {
            if (item.tipo === 1) {
              console.log(typeof item.valor);

              this.receita = this.receita + parseFloat(item.valor);
            } else {
              this.dispesa = this.dispesa + parseFloat(item.valor);
            }
          });
          this.total = this.receita - this.dispesa;
        });
    }
  }

  otherMouth() {
    this.mesSelecionada = this.meses.find(
      (mes) => this.selected.value === mes.value
    );
    this.listar();
  }

  deletar(id: number) {
    this.itemService.excluir(id).subscribe(() => {
      this.listar();
    });
  }
  editar(item: Item) {
    this.dialog
      .open(CreateItemComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe(() => {
        this.listar();
      });
  }
}
