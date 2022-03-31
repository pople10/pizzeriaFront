import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { HandleRequestService } from '../../shared/services/handle-request.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/modals/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.sass']
})
export class ManageUsersComponent implements OnInit,OnDestroy {
  

  constructor(private userService:UserService,
    private router:Router,
    private renderer:Renderer2,
    private handleRequestService:HandleRequestService) { 
  }
  users: User[]=[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dataSent:boolean=false;

 
  deleteUser(id: number) {
    this.dataSent=true;
    this.userService.disableUser(id).subscribe(response => {
      this.userService.getUsers().subscribe(response=>{
        this.users=response;
      });
      this.handleRequestService.showSuccess();
    },err=>{
      this.handleRequestService.handleError(err);
    }).add(()=>{
      this.dataSent=false;
    });
  }
  

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response=>{
      this.users=response;
      this.dtTrigger.next();
    },err=>{this.handleRequestService.handleError(err);});
    this.dtOptions = {
      responsive: true
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}