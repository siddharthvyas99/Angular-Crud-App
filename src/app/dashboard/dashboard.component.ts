import { Component, OnInit, OnChanges } from '@angular/core';
import { DbService } from '../db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnChanges {
  ob:any[];
  det:object;
  det1:any;
  srtDes:any;
  sendid:any;
  showUser:boolean=true;
  isProfileInfoactiveLink : boolean = true;
  //isAdmin = false;
  userid:any;
  isAdmin:boolean = false;
  isCollapsed = false;
  constructor(private dbservice:DbService,private router:Router,private route:ActivatedRoute,private auths:AuthService) {
    this.det1=JSON.parse(atob(localStorage.getItem('loggedUser')));
    this.det1=this.det1.obj;
     console.log(this.det1);
   }

  ngOnInit() {
    this.isAdmin=false;
    this.dbservice.sortDta()
    .then(re=>{
      this.srtDes=re.rows;
      console.log(this.srtDes);
    })
    //console.log('Dashboard HI');
    this.dbservice.getAll().then(res => {
      console.log(res);
     this.ob=res.rows;
     

  })
    if(this.det1.Email==="sid@gml.com"){
      this.isAdmin=true;
    }
//   .then(re=>{
   
//    this.route.queryParams.subscribe((params)=>{
//  // //console.log("QuerPWorkmngGIne");
//  //  //console.log(params);
//  //   //this.userid=JSON.parse(atob(params.data));
//     console.log(params);
//     this.userid=JSON.parse(params.sendid);
//     if(this.userid.id==="sid@gml.com") {
//       this.isAdmin=true;
//     }

//     //console.log(this.userid.id);
//     this.ob.forEach((el : any, i) => {
//       //console.log(el.doc._id);
//       if(el.doc._id === this.userid.id) {
//          this.det=el.doc;
//       //   //console.log(this.det);
//       }

//     })
    
//   })
  
//    // //console.log(this.userid);
//    })

   

  
  }
  ngOnChanges(){
    this.dbservice.getAll().then(res => {
      console.log(res);
     this.ob=res.rows;
     console.log(this.ob);
  })

  }


  checkAdmin():boolean{
    console.log(this.userid)
    // if(this.userid.id==="sid@gml.com"){
    //   this.isAdmin=true;
    //   return true;
    // }
    return false;
  }

  showProfile(){
    this.showUser=false;
    this.sendid=this.userid;
    this.router.navigate(['/profile'],{
      //  queryParams:{sendid:btoa(JSON.stringify(sendid))}
       queryParams:{sendid:JSON.stringify(this.sendid)}        
  });
  }

  showInfo(){
    this.showUser=true;
  }
  

  logout(){
    this.router.navigate(['/login']);
    this.auths.loggedOut();
    
  
  }

}
