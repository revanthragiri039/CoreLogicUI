import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoanDashboardComponent } from './loan-dashboard/loan-dashboard.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoanServiceService } from './loan-service.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MainheaderComponent } from './main-header/mainheader.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoanDashboardComponent,
    AddLoanComponent,
    MainheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoanServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
