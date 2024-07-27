import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from 'src/app/shared/dialog/create-item/create-item.component';
import { Item } from 'src/app/shared/interfaces/item.interface';
import Mouth from './mouth';
import { FormControl, Validators } from '@angular/forms';
import { ItemService } from 'src/app/shared/services/item.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';
import UsuarioLogado from 'src/app/shared/interfaces/usuarioLogado.interface';
import Years from './years';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'valor',
    'data',
    'tipo',
    'acoes',
    'pago',
  ];
  dataSource: Item[] = [];
  receita: number = 0;
  dispesa: number = 0;
  total = 0;
  pago = false;
  meses = Mouth.prototype.config();
  mesSelecionada = this.meses.find(
    (mes) => new Date().getMonth() + 1 === mes.value
  );
  anoSelecionado = new Date().getFullYear();
  anos = Years.prototype.config();
  selected = new FormControl(this.mesSelecionada?.value, [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  selectedAno = new FormControl(this.anoSelecionado, Validators.required);

  constructor(
    private dialog: MatDialog,
    private itemService: ItemService,
    private message: MessageService,
    private userService: UserService
  ) {}
  usuarioLogado: UsuarioLogado = this.userService.obterUsuarioLogado;

  ngOnInit(): void {
    console.log(new Date().getFullYear());

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
        .list(
          this.usuarioLogado.id,
          this.selected.value as number,
          this.selectedAno.value as number
        )
        .subscribe((data: Item[]) => {
          console.log(data);

          data.forEach((item: Item, index) => {
            item.id = index + 1;
            if (item.tipo === 1) {
              this.receita = this.receita + parseFloat(item.valor.toString());
            } else {
              this.dispesa = this.dispesa + parseFloat(item.valor.toString());
            }
            this.dataSource = data;
          });
          this.total = this.receita - this.dispesa;
        });
    }
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

  itemPago(item: Item, pago: boolean) {
    item.pago = pago;
    this.itemService.add(item).subscribe(() => {
      this.message.showMessage('item salvo com sucesso');
    });
  }
  sair() {
    this.userService.deslogar();
  }
}
