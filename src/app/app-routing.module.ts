import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { LoanDashboardComponent } from './loan-dashboard/loan-dashboard.component';
import { MainheaderComponent } from './main-header/mainheader.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',component:AppComponent,children:[{path:'',component:LoginComponent}]},
  {path:'addLoan',component:AddLoanComponent},
  {path:'UpdateLoan/:id',component:AddLoanComponent},
  {path:'LoanDashboard',component:LoanDashboardComponent},
  {path:'header',component:MainheaderComponent},
  {path:'login',component:LoginComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
