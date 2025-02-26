import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly route: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    const user: User = {
      email: this.form.controls.email.value as string,
      password: this.form.controls.password.value as string,
    };
    this.userService.logar(user).subscribe((usuario: any) => {
      if (usuario) {
        localStorage.setItem('token', JSON.stringify(usuario.access_token));
        localStorage.setItem('usuario', JSON.stringify(usuario.user));
        this.route.navigate(['/']);
      }
    });
  }
  register() {
    this.route.navigate(['/registrar']);
  }
}
