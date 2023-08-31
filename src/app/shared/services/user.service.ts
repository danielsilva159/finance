import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rota = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  create(user: User) {
    return this.http.post(this.rota, user);
  }
}
