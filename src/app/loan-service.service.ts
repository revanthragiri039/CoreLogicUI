import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { LoanModel } from './Models/LoanModel';
import { catchError } from 'rxjs';
import { LoginModel } from './Models/LoginModel';
import { SearchModel } from './Models/SearchModel';

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {

  constructor(private _http:HttpClient) { }
  Url:String="https://localhost:6001/api/loan";
  getLoans(model:SearchModel) :Observable<LoanModel[]>
  {
    const url=`${this.Url}/getAllLoans`
    return this._http.post<LoanModel[]>(url,model).pipe(catchError(this.errorHandler));
  }

  SaveLoandetails(loanmdl:LoanModel) : Observable<LoanModel>
  {
    const url=`${this.Url}/saveLoan`
    return this._http.post<LoanModel>(url,loanmdl,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })})
      .pipe(catchError(this.errorHandler));
  }
  
  getLoandetailsbyid(id:any):Observable<LoanModel>
  {
    const url=`${this.Url}/${id}`
    return this._http.get<LoanModel>(url).pipe(catchError(this.errorHandler));
  }

  updateLoanDetails(updloan:LoanModel):Observable<LoanModel>
  {
    const url=`${this.Url}/updateLoan`
    return this._http.put<LoanModel>(url,updloan,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })}).pipe(catchError(this.errorHandler));
  }

  DeleteLoanbyId(id:any):Observable<LoanModel>
  {
    const url=`${this.Url}/${id}`
    return this._http.delete<LoanModel>(url).pipe(catchError(this.errorHandler));
  }

  Login(model:LoginModel) : Observable<LoginModel>
  {
    const url=`${this.Url}/login`
    return this._http.post<LoginModel>(url,model,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })}).pipe(catchError(this.errorHandler));
  }

  searchLoanDetails()
  {

  }

  errorHandler(error:HttpErrorResponse)
  {
    return throwError(error.message||"Unknow Server Error");
  }
}
