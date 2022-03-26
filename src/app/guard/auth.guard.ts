import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  private checkRoles(roles:string[],userRoles:string)
  {
    for(let role of roles)
    {
        if(userRoles==role)
          return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot) {
      if (localStorage.getItem("token") && localStorage.getItem("user")) {
        let user = JSON.parse(localStorage.getItem("user"));
        if(this.checkRoles(route.children[0].data.role,user.role))
          return true;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/pages/my-account']);
    return false;
  }
  
}
