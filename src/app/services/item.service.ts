import { Injectable } from '@angular/core';
import { Item } from '../shared/interfaces/item.interface';
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
  list(mes: number) {
    return this.http.get(this.rota, { params: { mouth: mes } });
  }
}
