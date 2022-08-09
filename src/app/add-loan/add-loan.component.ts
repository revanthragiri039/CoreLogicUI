import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { LoanServiceService } from '../loan-service.service';
import { LoanModel } from '../Models/LoanModel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent implements OnInit {
  addLoanForm: FormGroup;
  submitted = false;
  Loanid: any = 0;
  hedValue = ""
  toAdddisplay = false;
  toUpdatedisplay = true;
  loanDetailsresponse: any;
  constructor(private formbuilder: FormBuilder, private _service: LoanServiceService, private _activatedroute: ActivatedRoute, private _router: Router) {
    this.addLoanForm = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      loannumber: ['', Validators.required],
      propertyaddress: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.Loanid = parseInt(this._activatedroute.snapshot.paramMap.get('id') || '')

    if (parseInt(this.Loanid)) {
      this.hedValue = "Update Loan"
      this.toAdddisplay = true;
      this.toUpdatedisplay = false;
      this.getLoandetailsbyid(this.Loanid);
    }
    else {
      this.hedValue = "New Loan"
      this.toAdddisplay = false;
      this.toUpdatedisplay = true;
    }
  }

  clear() {
    this.addLoanForm.reset({});
    this.submitted = false;
  }

  AddLoan(from: any) {
    if (this.addLoanForm.valid === false) {
      this.submitted = true;
    }
    else {
      const model = new LoanModel(0, this.addLoanForm.value.firstname, this.addLoanForm.value.lastname, this.addLoanForm.value.loannumber, this.addLoanForm.value.propertyaddress);
      const loanrespone = this._service.SaveLoandetails(model).subscribe((data: LoanModel) => {
        this.addLoanForm.reset({});
        this.submitted = false;
        Swal.fire("Loan Details", 'Added successfully', 'success').then(a => {
          this._router.navigate(['/LoanDashboard']);
        });
      }, (error => {
        Swal.fire("Loan Details", error, 'error').then(a => {
        });
      }));
    }
  }

  getLoandetailsbyid(id: any) {
    this._service.getLoandetailsbyid(id).subscribe(a => {
      this.loanDetailsresponse = a;
      this.addLoanForm.setValue({
        firstname: this.loanDetailsresponse.data.firstName,
        lastname: this.loanDetailsresponse.data.lastName,
        loannumber: this.loanDetailsresponse.data.loanNumber,
        propertyaddress: this.loanDetailsresponse.data.propertyAddress
      });
    }, (error) => {
      Swal.fire('Loan Details!!', error, 'error');
    });
  }

  UpdateLoan(from: any) {
    if (this.addLoanForm.valid == false) {
      this.submitted = true;
    }
    else {
      const model = new LoanModel(this.Loanid, this.addLoanForm.value.firstname, this.addLoanForm.value.lastname, this.addLoanForm.value.loannumber, this.addLoanForm.value.propertyaddress);
      this._service.updateLoanDetails(model).subscribe((data: LoanModel) => {
        this.addLoanForm.reset({});
        this.submitted = false;
        Swal.fire("Loan Details", 'Updated successfully', 'success').then(a => {
          this._router.navigate(['/LoanDashboard']);
        });
      }, (error => {
        Swal.fire("Loan Details", error, 'error').then(a => {
        });
      }));

    }
  }

}
