import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CardItemComponent } from './shared/components/card-item/card-item.component';
import { CreateItemComponent } from './shared/dialog/create-item/create-item.component';
import { CurrencyMaskDirective } from './shared/directive/currency-mask.directive';
import { InputMaskModule } from '@ngneat/input-mask';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CardItemComponent,
    CreateItemComponent,
    CurrencyMaskDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
  ],
  exports: [CurrencyMaskDirective],
  providers: [MatDatepickerModule, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
