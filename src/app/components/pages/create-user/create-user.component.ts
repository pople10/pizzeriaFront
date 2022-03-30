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

export class CreateUserComponent implements OnInit {
  constructor(private authService:AuthService,private handleRequestService:HandleRequestService,private router:Router)
  {}

  isSubmitted:boolean=false;
  data:User=new User();

  createUserForm = new FormGroup({
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
      ]),
    role:new FormControl(
    	'',
    	[
    		Validators.required
    	])
  });

  // to discuss
  ngOnInit() {
    if(this.authService.getUser().role != )
      this.router.navigate(["/home"])
  }

  createUser(event)
  {
    event.preventDefault();
    this.isSubmitted=true;
    if(this.createUserForm.valid)
    {
      this.authService.createUser(this.data).subscribe(response=>{
        this.data.clear();
        this.isSubmitted=false;
        this.handleRequestService.showSuccess();
      },err=>{
        this.handleRequestService.handleError(err);
      })
    }
  }

  get form()
  {
    return this.createUserForm.controls;
  }

  get colorCreateUser()
  {
    if(this.createUserForm.valid)
      return "primary";
    return "accent";
  }

}