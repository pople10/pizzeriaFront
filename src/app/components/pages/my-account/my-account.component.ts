import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../../../modals/user.model';
import { AuthService } from '../../shared/services/auth.service';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent implements OnInit {
  constructor(private authService:AuthService,private handleRequestService:HandleRequestService,private router:Router)
  {}

  isSubmitted:boolean=false;
  data:User=new User();
  dataSent:boolean=false;
  login:string=null;
  password:string=null;

  registerForm = new FormGroup({
    email: new FormControl('',
    [

      Validators.required,
      Validators.email
    ]),
    password: new FormControl(
    '',
    [
      Validators.required
    ]),
    firstname:new FormControl(
      '',
      [
        Validators.required
      ]),
    lastname:new FormControl(
      '',
      [
        Validators.required
      ])
  });


  ngOnInit() {
    if(this.authService.isLoggedIn())
      this.router.navigate(["/home"])
  }

  register(event)
  {
    event.preventDefault();
    this.isSubmitted=true;
    if(this.registerForm.valid)
    {
      this.dataSent=true;
      this.authService.register(this.data).subscribe(response=>{
        this.data.clear();
        this.isSubmitted=false;
        this.handleRequestService.showSuccess();
      },err=>{
        this.handleRequestService.handleError(err);
      }).add(()=>{
        this.dataSent=false;
      });
    }
  }

  loginSubmit(event)
  {
    event.preventDefault();
    if(this.checkLoginForm())
    {
      this.dataSent=true;
      this.authService.login({email:this.login,password:this.password}).subscribe(response=>{
        this.authService.loggedIn(response);
        this.router.navigate(["/home"]);
      },err=>{
        this.handleRequestService.handleError(err);
      }).add(()=>{
        this.dataSent=false;
      });
    }
  }

  get form()
  {
    return this.registerForm.controls;
  }

  get colorRegister()
  {
    if(this.registerForm.valid)
      return "primary";
    return "accent";
  }

  private checkLoginForm():boolean
  {
    return this.login&&this.password&&this.login.trim()!=""&&this.password.trim()!="";
  }

  get colorLogin()
  {
    if(this.checkLoginForm())
      return "primary";
    return "accent";
  }
}
