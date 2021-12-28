import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpage!:FormGroup;
  

  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router) { }  

  ngOnInit(): void {
    this.forgetpage=this.formbuilder.group({
      email:['',[Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],

    })
  }
  get email()
  {
   return this.forgetpage.get('email')
  }
 
  Submit(){
    this.http.get<any>("http://192.168.1.140:3000/forget",this.forgetpage.getRawValue()).subscribe((result)=>{
      
    console.log("succesful")
    },err=>{
      alert("somthing wrong")
    })
  }

}
