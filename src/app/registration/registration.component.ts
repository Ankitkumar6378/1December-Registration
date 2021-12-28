import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import{HttpClient} from'@angular/common/http'
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!:FormGroup
  public errorMessage: string = '';

  constructor(private formbuilder:FormBuilder, private http:HttpClient,private router:Router,private userdata:ServerService,private errorHandler:ErrorHandlerService ) { }
  ngOnInit(): void {
    this.registrationForm=this.formbuilder.group({
    username:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$')]],
    email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    mobile:['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
    password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]]
    })
  }
  get username()
  {
   return this.registrationForm.get('username')
  }
  get email()
  {
   return this.registrationForm.get('email')
  }
  get mobile()
  {
   return this.registrationForm.get('mobile')
  }
  get password()
  {
   return this.registrationForm.get('password')
  }
  submit(){
    this.userdata.postdata(this.registrationForm.value).subscribe((result)=>{
      alert("Registration Successfull !!!");
      this.registrationForm.reset();
      this.router.navigate(['login'])
  
     },(error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
  
    })
  }
}
