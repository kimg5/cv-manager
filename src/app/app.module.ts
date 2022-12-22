import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {DockModule} from 'primeng/dock';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';


import { AppComponent } from './app.component';
import { PanelsModule } from './components/panels.module';
import { DockComponent } from './dock/dock.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DockComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DockModule,
    DynamicDialogModule,
    ToastModule,
    PanelsModule,
    CardModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
