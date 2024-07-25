import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  rota = 'http://localhost:3000/item';
  constructor(private http: HttpClient) {}

  add(item: Item) {
    return this.http.post(this.rota, item);
  }
  list(id: string, mes: number, ano: number) {
    return this.http.get(this.rota, { params: { mouth: mes, id, year: ano } });
  }

  excluir(id: number) {
    return this.http.delete(`${this.rota}/${id}`);
  }
}
