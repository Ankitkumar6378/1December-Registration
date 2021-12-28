import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm!:FormGroup
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private errorHandler:ErrorHandlerService) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]]
    })
  }
  get email()
  {
   return this. loginForm.get('email')
  }
  get password()
  {
   return this.loginForm.get('password')
  }
  login(){
    this.http.post<any>("http://192.168.1.140:3000/login",this.loginForm.value).subscribe((result)=>{
      const user=result.find((a:any)=>
      {
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      })
      if(user){
        alert("login successfully  !!");
        this.loginForm.reset();
        sessionStorage.setItem('loggedUser', user.email);

        this.router.navigate(['home'])
      }
     },(error) => {
      this.errorHandler.handleError(error);
    }
    )
  }

}