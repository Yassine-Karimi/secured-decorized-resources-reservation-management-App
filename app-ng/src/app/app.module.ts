import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./component/header/header.component";

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminTemplateComponent } from './component/admin-template/admin-template.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { ClientComponent } from './component/client/client.component';
import { EditClientComponent } from './component/client/edit-client/edit-client.component';
import {NgbModule,ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { AddClientComponent } from './component/client/add-client/add-client.component';
import {TruncatePipe} from "./pipes/truncate.pipe";
import {DateFormatPipe} from "./pipes/date-format.pipe";
import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { ReservationsComponent } from './component/reservations/reservations.component';
import { ResourcesComponent } from './component/resources/resources.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'sdia-realm',
        clientId: 'glsid-bdcc-customer-client'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe : true,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });

}
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AdminTemplateComponent,
        WelcomeComponent,
        ClientComponent,
        EditClientComponent,
        AddClientComponent,
        TruncatePipe,
        DateFormatPipe,
        ReservationsComponent,
        ResourcesComponent,
        // ReservationsComponent
    ],
  imports: [
    BrowserModule,
    GridsterModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatDialogModule,
    KeycloakAngularModule

  ],
  providers: [
    {provide : APP_INITIALIZER, deps : [KeycloakService],useFactory : initializeKeycloak, multi : true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
