import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../../../modals/user.model';
import { AuthService } from '../../shared/services/auth.service';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
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
  }

  createUser(event)
  {
    event.preventDefault();
    this.isSubmitted=true;
    if(this.createUserForm.valid)
    {
      console.log(this.data);
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
