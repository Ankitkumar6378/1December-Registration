import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
 
  constructor(private router: Router) { }
 
  public handleError = (error: HttpErrorResponse) => {
    if(error.status === 401){
      this.handle401Error(error);
    }
    else if(error.status === 402){
      this.handle402Error(error)
    }
    else if(error.status === 400){
      this.handle400Error(error)
    }

    else if(error.status === 302){
      this.handle302Error(error)
    }
    else if(error.status === 303){
      this.handle303Error(error)
    }
    else if(error.status === 304){
      this.handle304Error(error)
    }
    else{
      this.handleOtherError(error);
    }
  }
 
  private handle401Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/500']);
       alert("401 Email already exist")
       console.log("401 Email already exist")
  }
 
  private handle402Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    // this.router.navigate(['/404']);
    alert("402 phone number already exist");
    console.log("402 phone number already exist")

  }
  private handle400Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/404']);
    alert("400 registration not completed");
    console.log("400 registration not completed")

  }

  private handle303Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/404']);
    alert("303 invalid details");
    console.log("303 invalid details")
    this.router.navigate(['home'])

  }

  private handle302Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
     this.router.navigate(['home']);
    alert("LOGIN sUCCESSFULL");
    

  }
  private handle304Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/404']);
    alert("304 id/password not match");
    console.log("304 id/password not match")

  }

 
  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    // alert("somthing wrong in Registration page")
    //TODO: this will be fixed later;
  }
 
  private createErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}
