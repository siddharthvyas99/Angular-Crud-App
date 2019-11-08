import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  redirectUrl:string;
  constructor(private router:Router) { }
  

  loggedIn(user:any){
    console.log(user);
    let doc=atob(localStorage.getItem('loggedUser'));
    let lin=localStorage.getItem('loggedIn');
     if(doc!==""&&lin){
      this.isLoggedIn=true;
      this.router.navigate(['/dashboard'],{
             // //  queryParams:{sendid:btoa(JSON.stringify(sendid))}
               queryParams:{sendid:JSON.stringify(user)}        
          });
     }    
  }

  logdIn(){
    let doc=atob(localStorage.getItem('loggedUser'));
    if(doc!=""){
    let ob=JSON.parse(doc);
    console.log(doc);
    let lin=localStorage.getItem('loggedIn');
     if(doc!==""&&lin){
      this.isLoggedIn=true;
      let sendid:object={'id':ob.obj.Email};
      // this.router.navigate(['/dashboard'],{
      //        // //  queryParams:{sendid:btoa(JSON.stringify(sendid))}
      //          queryParams:{sendid:JSON.stringify(sendid)}        
      //     });
      this.router.navigate(['/dashboard']);
     }
    }
  }

  loggedOut():void{
    // let doc:any=atob(localStorage.getItem('loggedUser'));
    // let lin:boolean=localStorage.getItem('loggedIn');
    localStorage.setItem('loggedUser','');
    localStorage.setItem('loggedIn','false');
    this.isLoggedIn=false;
    
  }
}




