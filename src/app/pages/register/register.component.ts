import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { MessageService } from 'src/app/shared/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly route: Router,
    private readonly userService: UserService,
    private message: MessageService
  ) {}

  voltar() {
    this.route.navigate(['/login']);
  }

  salvar() {
    this.userService.create(this.form.value as User).subscribe({
      next: () => {
        this.message.showMessage('Usuario Registrado com sucesso');
        this.route.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.message.showMessage(error.error.message);
        this.form.reset();
      },
    });
  }
}
