import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { finalize, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private mensagem: MessageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.userService.obterTokenUsuario;
    const started = Date.now();
    let ok: string;
    console.log(token);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(request);

    return next.handle(request).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) =>
          (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        error: (error) => {
          ok = 'Sessão expirada';
          this.userService.deslogar();
        },
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
        this.mensagem.showMessage(msg);
      })
    );
  }
}
