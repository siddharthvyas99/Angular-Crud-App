import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  
  constructor(private _authService:AuthService,private _router:Router,private route:ActivatedRoute,private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const user=this._authService.loggeduser
    if (this._authService.isLoggedIn) {
      
      return true;
        
    } else {
        this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });
        return false;
    }
}










  // canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
  //   let url:string=state.url;

  //   return this.checkLogin(url);
    
  // }
  // checkLogin(url:string):boolean{
  //    if(this._authService.isLoggedIn){
  //     //this._router.navigate(['dashboard'],{relativeTo:this.route}); 
  //     console.log("Loggd In");
  //     return true;
       
  //    }
  //    this._authService.redirectUrl=url;

  //    this._router.navigate(['login'],{relativeTo:this.route});
  //    return false;

  // }
  

  
}
