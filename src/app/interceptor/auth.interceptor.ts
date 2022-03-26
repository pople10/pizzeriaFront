import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/shared/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router,private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("intercepting...");
    const token = localStorage.getItem("token");
    let cond:boolean = request.url.indexOf("/auth/") == -1;
    if(cond){
      try{
        if(token != null&&token!=undefined){
          request = request.clone({
            setHeaders : {
              Authorization : `Bearer ${token}`
            }
          });
        }else{
          this.authService.loggedOut();
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        }
      }, error => {
        if(cond)
        {
          let status=error.status;
          if(status==401||status==403)
          {
            this.authService.loggedOut();
            this.router.navigate(["/pages/my-account"]);
          }
        }
      })
    );
  }
}
