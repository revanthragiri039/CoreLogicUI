export class LoanModel{
    LoanId : Number;
    FirstName:string;
    LastName:String;
    LoanNumber:Number;
    PropertyAddress : string;
    constructor(loanid:number,firstname:string,lastname:string,loannumber:number,propertyaddress:string)
    {
        this.LoanId=loanid;
        this.FirstName=firstname;
        this.LastName=lastname;
        this.LoanNumber=loannumber;
        this.PropertyAddress=propertyaddress
    }
}