import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DbService } from '../db.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  photo:any;
  ob:any = [];
  WrongPass:boolean=false;
  EmailPresent:boolean=true;
  Message:string;
  encd:any;
  returnUrl:string;

  loginForm=new FormGroup({
  Email:new FormControl('MrWitty@gml.com',[Validators.required,Validators.email]),
  pass:new FormControl('bablu123',Validators.required),
  });
  //loginForm:FormGroup;
  constructor(private fb:FormBuilder
    ,private dbservice:DbService,private router:Router,private route:ActivatedRoute,private authservice :AuthService) {
    this.photo="assets/bg-01.jpg";
    this.dispMessage();
   }

  ngOnInit() {
    // this.loginForm=this.fb.group({
    //   Email:new FormControl(null,[Validators.required,Validators.email]),
    //   pass:new FormControl(null,Validators.required),
    //   });
    this.authservice.logdIn();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('hi')
    this.dbservice.getAll().then(res => {
      console.log(res);
     this.ob=res.rows;
  })
}

  dispMessage(){
    this.Message='You are logged'+this.authservice.isLoggedIn?'in':'out';
  }

  onSubmit(val:FormGroup){
   // console.log(val.value);
    //console.log(JSON.stringify(val.value));
    let eid=val.value["Email"];
    let ps=val.value["pass"];
    console.log(eid,ps);
    //console.log(this.dbservice.getAll());
    //let ob:object;
    //console.log(this.ob)
     
    this.ob.forEach((el : any, i) => {
      console.log(el.doc._id);
      let sendid:object={'id':eid};

     
      //console.log(typeof(eid));
      if(el.doc._id === eid) {
        if(el.doc.obj.pass===ps){
           
    
        console.log(el.doc.obj)
        console.log("success");
       
                
  //       this.router.navigate(['/dashboard'],{
  //      // //  queryParams:{sendid:btoa(JSON.stringify(sendid))}
  //        queryParams:{sendid:JSON.stringify(sendid)}        
  //   });
  //  //console.log(el.doc.obj)
    this.encd=btoa(JSON.stringify(el.doc));
    console.log(this.encd);
    localStorage.setItem('loggedUser',this.encd);  
    localStorage.setItem('loggedIn','true');
  this.authservice.loggedIn(sendid);
  this.dispMessage();

      
  



        }
        else{
          this.WrongPass=true;
        }    
      }
      else{
        console.log("NO");
        this.EmailPresent=false;
      }
    })              
               
             
    // login() {
    //   this.message = 'Trying to log in ...';
   
    //   this.authService.login().subscribe(() => {
    //     this.setMessage();
    //     if (this.authService.isLoggedIn) {
    //       // Get the redirect URL from our auth service
    //       // If no redirect has been set, use the default
    //       let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';
   
    //       // Redirect the user
    //       this.router.navigateByUrl(redirect);
    //     }
    //   });
    // }
     
                  //})

      
    
  }

}
