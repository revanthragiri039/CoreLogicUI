import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../loan-service.service';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { SearchModel } from '../Models/SearchModel';
@Component({
  selector: 'app-loan-dashboard',
  templateUrl: './loan-dashboard.component.html',
  styleUrls: ['./loan-dashboard.component.css']
})
export class LoanDashboardComponent implements OnInit {
  searchloandetails:FormGroup;
  loanlist:any=[];
  todisplay=false;
  public errMsg:any;
  loandetailsresponse:any;
  role:any="";
  constructor(private _loanservice:LoanServiceService,private _router:Router,private _frombuilder:FormBuilder) 
  { 
    this.searchloandetails=this._frombuilder.group({
      firstname:[],
      lastname:[],
      loannumber:[]
    });
  }

  ngOnInit() {
    this.role=localStorage.getItem('Role');
    if(this.role=="User")
    {
      this.todisplay=true;
    }
     this.loanlist.data=0;
  }

  GetLoansList()
  {
    const model= new SearchModel("","","");
    this._loanservice.getLoans(model).subscribe(a=>{    
      this.loanlist=a;
    },(error)=>{
      Swal.fire("Loan Dashboard!!",error,'error');
      this.loanlist.data=0;
    });
  }

  EditLoan(Id:any)
  { 
   this._router.navigate(['/updateLoan',Id]);
  }

  DeleteLoan(Id:any)
  {
    Swal.fire({
      title:'Are you sure want to delete?',
      text :'Loan Details!!',
      icon :'warning',
      showCancelButton:true,
      confirmButtonText:'Yes, delete it!',
      cancelButtonText:'Cancel'
    }).then((response:any)=>{
      if(response.value)
      {
        this._loanservice.DeleteLoanbyId(Id).subscribe(x=>{
          this.loandetailsresponse =x;
          console.log(this.loandetailsresponse,'Test');
          if(this.loandetailsresponse.success==true)
          {
            Swal.fire('Deleted!','Loan details have been deleted successfully.','success')
            //this.GetLoansList();
            this.loanlist.data=0;
          }
          else{
            Swal.fire('Deleted!',this.loandetailsresponse.data.message,'error')
          }
        },(error)=>{
          Swal.fire("Loan Dashboard!!",error,'error');
        });
        
      }
    })
  }

  AddnewLoan()
  {
    this._router.navigate(['/addLoan'])
  }

  searchLoandetails(from:any)
  {
    const model= new SearchModel(
      this.searchloandetails.value.firstname==null?"":this.searchloandetails.value.firstname,
      this.searchloandetails.value.lastname==null?"":this.searchloandetails.value.lastname,
      this.searchloandetails.value.loannumber==null?"":this.searchloandetails.value.loannumber
      );
    this._loanservice.getLoans(model).subscribe(a=>{    
      this.loanlist=a;
    },(error)=>{
      Swal.fire('Loan Dashboard!!',error,'error');
      this.loanlist.data=0;
    });
  }

  Clear()
  {
    this.searchloandetails.reset({});
    this.loanlist.data=0;
  }

}
