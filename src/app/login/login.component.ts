import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoanServiceService } from '../loan-service.service';
import { LoginModel } from '../Models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  loginresponse:any;
  constructor(private formbuilder:FormBuilder,private route:Router,private _service:LoanServiceService) 
  {
     this.loginForm=this.formbuilder.group({
         username :['',Validators.required],
         password:['',Validators.required]
     });
  }

  ngOnInit(){
  }

  Clear()
  {
    this.submitted=false;
    this.loginForm.reset({});
  }

  onLogin(from:any)
  {
    if(this.loginForm.valid==false)
    {
    this.submitted=true;
    }
    else
    {
      const model=new LoginModel(this.loginForm.value.username,this.loginForm.value.password,'');
      this._service.Login(model).subscribe((data:LoginModel)=>{
       console.log(data);
       this.loginresponse=data;
       if(this.loginresponse.success==true)
       {
        localStorage.setItem('Role',this.loginresponse.data.role);
        this.route.navigate(['/LoanDashboard']);
       }
       else{
         Swal.fire('Loan Application','UserName or Password Incorrect!!','error');
       }
      },(error)=>{
        Swal.fire("Loan Application!!",error,'error');
      });
      
    }
    console.log(this.loginForm)
  }

}
