import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rota = 'http://localhost:3000/user';
  constructor(private http: HttpClient, private router: Router) {}

  create(user: User) {
    return this.http.post(this.rota, user);
  }

  logar(user: User) {
    console.log(user);
    return this.http.post(`${this.rota}/login`, user);
  }

  get obterUsuarioLogado(): any {
    return localStorage.getItem('usuario')
      ? JSON.parse(localStorage.getItem('usuario') as string)
      : null;
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token') as string)
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
