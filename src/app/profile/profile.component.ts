import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, FormArray } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ob:any[];
  det:object;
  det1:any;
  ddet:any;
  srtDes:any;
  userform:FormGroup;
  changeP:FormGroup;
  isVisible = false;
  isVisibleP = false;
  curId:any;
  curRev:any;
  isProfileEditactiveLink:Boolean=true;

  //isAdmin = false;
  userid:any;
  isAdmin:boolean = false;
  isCollapsed = false;

  // checkOldPas = (control: FormControl) =>
  //   new Observable((observer: Observer<ValidationErrors | null>) => {
  //     setTimeout(() => {
  //       if (control.value !== this.ddet.obj.pass.value) {
  //         console.log(control.value);
  //         console.log(this.ddet.obj.pass);
  //         observer.next({ error: true, notMatch: true });
  //       } else {
  //         observer.next(null);
  //       }
  //       observer.complete();
  //     }, 1000);
  //   });
  checkOldPas = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.ddet.obj.pass) {
      return { confirm: true, error: true };
    }
    return {};
  };



  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.changeP.controls.NewPass.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private dbservice:DbService,private router:Router,private route:ActivatedRoute,private fb:FormBuilder
    ,private auths:AuthService) {
    this.ddet=this.fetchDat();
    // this.det1=JSON.parse(atob(localStorage.getItem('loggedUser')));
    // this.ddet=this.det1;
    // this.det1=this.det1.obj;
    //  console.log(this.det1);
    //  console.log(this.ddet._rev,this.ddet._id);     


      

      this.changeP=this.fb.group({
        OldPass:['',[Validators.required,this.checkOldPas]],
        NewPass:['',Validators.required],
        NewRPass:['',this.confirmValidator]
      });
   }

  ngOnInit() {
    this.fetch();
    this.isAdmin=false;

    
    this.userform =this.fb.group({
      FirstName:[''],
      LastName:[''],
      Email:[''],
      // address: this.fb.group({
      //   street: [''],
      //   zip: ['']
      // }),

      addresses: this.fb.array([
        this.initAddress(),
    ]),

      pass:[''],
      rpass:['']
      });  

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
//   .then(re=>{
   
//    this.route.queryParams.subscribe((params)=>{
// //  //console.log("QuerPWorkmngGIne");
// //   //console.log(params);
//  //   //this.userid=JSON.parse(atob(params.data));
//     console.log(params);
//     this.userid=JSON.parse(params.sendid);
//     if(this.userid.id==="sid@gml.com") {
//       this.isAdmin=true;
//     }

//  //   //console.log(this.userid.id);
//     this.ob.forEach((el : any, i) => {
//    //   //console.log(el.doc._id);
//       if(el.doc._id === this.userid.id) {
//          this.det=el.doc;
//        //  //console.log(this.det);
//       }

//     })
    
//   })
  
//     // //console.log(this.userid);
//    })

   

  
  }



  ngOnChanges(){
   this.ddet= this.fetchDat();
    this.dbservice.getAll().then(res => {
      console.log(res);
     this.ob=res.rows;
     console.log(this.ob);
  })

  }


  initAddress() {
    // initialize our address
    return this.fb.group({
        street: ['', Validators.required],
        postcode: ['',Validators.required]
    });
}

isBlank(str:string) {
  return (!str || /^\s*$/.test(str));
}
addAddress() {
  // add address to the list
  const control = <FormArray>this.userform.controls['addresses'];
  control.push(this.initAddress());
}

removeAddress(i: number) {
  // remove address from the list
  const control = <FormArray>this.userform.controls['addresses'];
  control.removeAt(i);
}

removeAll(){
  const control = <FormArray>this.userform.controls['addresses'];
  // for(let ad of control.contorls;let i=index){
  //     console.log(ad,i);
  // }

  for(let ad=0;ad<control.length-1;ad++){
     //console.log(control.controls[ad].value);
     console.log(control.controls[ad].value.street,control.controls[ad].value.postcode);
     //console.log(typeof(control.controls[ad].value.street));

      if(this.isBlank(control.controls[ad].value.street)&&this.isBlank(control.controls[ad].value.postcode))
         control.removeAt(ad); 
    }
}



  checkAdmin():boolean{
    console.log(this.userid)
    // if(this.userid.id==="sid@gml.com"){
    //   this.isAdmin=true;
    //   return true;
    // }
    return false;
  }

  

  // populateform(ob:object){
  //   this.userform.patchValue(ob, {onlySelf:true});

  // }

  loadform(ob:any){
    for (let ad = 0; ad< ob.addresses.length-1; ad++){
      const linesFormArray = this.userform.get("addresses") as FormArray;
      linesFormArray.push(this.initAddress());
    }
      this.userform.patchValue(ob);
  }


  
  showModal(obj:any): void {
    this.isVisible = true;
    //this.populateform(obj);
    console.log(this.userform.get('addresses').value);
    console.log(this.userform.value);
    const actualArray = this.userform.get('addresses').value;
    actualArray.forEach((res: any, index) => {
      this.removeFunction(index);
    })
    
    this.loadform(obj);
    // this.removeAll();
    console.log(obj);
    //this.curId=id;
    //this.curRev=rev;
    //console.log(this.curId,this.curRev);
  }

  removeFunction(i) {
    if (this.userform.get('addresses').value.length > 1) {
      const index = this.userform.get('addresses').value.indexOf(i);
      this.userform.get('addresses').value.splice(index, 1);
      console.log(this.userform.get('addresses').value);
      // this.userform.removeControl(this.userform.get('addresses').value.controlInstance);
  }
  
  }
  showModalP(): void {
    this.isVisibleP = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
   
    this.isVisible = false;
    // this.removeAll();
  }

  handleOkP(): void {
    console.log('Button ok clicked!');
    this.isVisibleP = false;
  }

  handleCancelP(): void {
    console.log('Button cancel clicked!');
    this.isVisibleP = false;
  }

  
  submitForm(objc: any){
    console.log(objc);
    objc._id = this.curId;
    objc._rev = this.curRev;
    //console.log(this.ddet._id,this.ddet._rev);
   this.dbservice.updDet(objc,this.ddet._id,this.ddet._rev);

    // this.dbservice.seeC();
    // this.dbservice.fetchAndRenderAllDocs();
   // this.getAlll();
   this.fetchDat();
   console.log(this.ddet);
    this.handleCancel();
    this.curId="";
    this.curRev=""; 
     
  }
   checkOldPassword(gp:any){
    let op=gp.controls.OldPass.value;

    return op===this.det1.pass?null:{notmatch:true}
   }

   

  checkPassword(gp:any){
    let psw=gp.controls.NewPass.value;
    let rpsw=gp.controls.NewRPass.value;

    return psw===rpsw?null:{notmatch:true}
  }


  change(fm:any){
    console.log(fm);
   
    this.dbservice.updPass(fm,this.ddet._id,this.ddet._rev);
    
    
    this.handleCancelP();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.userform.reset();
    for (const key in this.userform.controls) {
      this.userform.controls[key].markAsPristine();
      this.userform.controls[key].updateValueAndValidity();
    }
  }
  
  sendDash(){

    this.router.navigate(['/dashboard'],{
      //  queryParams:{sendid:btoa(JSON.stringify(sendid))}
       queryParams:{sendid:JSON.stringify(this.userid)}        
  });
  }

  logout(){
    this.auths.loggedOut();
    this.router.navigate(['/login']);

  }

  fetchDat():any{
    this.det1=JSON.parse(atob(localStorage.getItem('loggedUser')));
    this.ddet=this.det1;
    this.det1=this.det1.obj;
     console.log(this.det1);
     console.log(this.ddet._rev,this.ddet._id);
     this.ddet=JSON.parse(atob(localStorage.getItem('loggedUser')));
   
     return this.ddet;
  }

  fetch(){
    this.fetchDat();
  }
}
