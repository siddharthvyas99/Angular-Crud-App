import { Component, OnInit, Inject, OnChanges, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { DbService } from '../db.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialogModule, MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
//import {Observable} from "rxjs/Rx";
//import 'rxjs/add/operator/toPromise'; 


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit{
 // @Input () child_id;
  animal: string;
  name: string;
  userform:FormGroup;
  signupForm:FormGroup;
  isVisible = false;
  isVisibleS = false;
  //userform:FormGroup;
  ob:any=[];
  users:any[];
  srtUs:any[];
  
 curId:any;
 curRev:any;
    
 searchUser:FormGroup;
 emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

 confirmValidator = (control: FormControl): { [s: string]: boolean } => {
  if (!control.value) {
    return { required: true };
  } else if (control.value !== this.signupForm.controls.NewPass.value) {
    return { confirm: true, error: true };
  }
  return {};
};

  constructor(private dbservice:DbService,
    private route:ActivatedRoute,
    private router :Router,
    private dialog:MatDialog,
    private service:UserService,
    private fb:FormBuilder 
    // private user : UserComponent
    ) { 

      
      

      this.searchUser=this.fb.group({
        Email:['']
      });

    }
  
  //userid:any;
  

  ngOnInit() {
    this.getAlll();
    //this.descSorted();
 

  // this.route.queryParams.subscribe((params)=>{
  //   console.log(params);
  //   // //this.userid=JSON.parse(atob(params.data));
  //    this.userid=JSON.parse(params.sendid);
     
  //    console.log(this.userid);
  //   })


    this.userform =this.fb.group({
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',[Validators.email,Validators.required]],
      // address: this.fb.group({
      //   street: [''],
      //   zip: ['']
      // }),
      addresses: this.fb.array([
        this.initAddress(),
    ]),

      pass:['',Validators.required],
      rpass:['',]
      });  


      this.signupForm=this.fb.group({
        FirstName:['',Validators.required],
        LastName:['', Validators.required],
        Email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
        pass:['',Validators.required],
        rpass:[''],
       
        // address: this.fb.group([{
        //   street: [null,Validators.required],
        //   zip: [' ',Validators.required],
        // }])
        addresses: this.fb.array([
          this.initAddress(),
      ])
        
        },{validator: this.checkPassword});
        // ,{validator: this.checkPassword});
    
   

  }
  
  checkPassword(gp:any){
    let psw=gp.controls.pass.value;
    let rpsw=gp.controls.rpass.value;

    return psw===rpsw?null:{notmatch:true}
  }

  initAddress() {
    // initialize our address
    return this.fb.group({
        street: ['', Validators.required],
        postcode: ['',Validators.required]
    });
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



  // onKey(e:Event){
  //   b=[...this.ob]

  // }


  submitsrchUser(usr:any){
    
       this.dbservice.getdata(usr);
  }
  
  submitForm(objc: any){
    console.log(objc);
    objc._id = this.curId;
    objc._rev = this.curRev;
    this.dbservice.updDetA(objc,this.curId,this.curRev);
    //this.dbservice.putdta(JSON.stringify(objc.value));
    // this.dbservice.seeC();
    // this.dbservice.fetchAndRenderAllDocs();
    this.getAlll();
    this.handleCancel();
    this.curId="";
    this.curRev=""; 
     
  }

  submitFormAd(objc: any){
    console.log(objc);
    this.dbservice.putdta(JSON.stringify(objc));
    //this.dbservice.updDetA(objc,this.curId,this.curRev);
    // this.dbservice.seeC();
    // this.dbservice.fetchAndRenderAllDocs();
    this.getAlll();
    this.handleCancelS();

     
  }

  // onEdit(ob:any,id:any,rev:any){
  //   // this.service.initializeUser(ob);
  //   this.service.populateform(ob);
  //   // this.user.getUserById(ob);
  //   const dialogConfig=new MatDialogConfig();
  //   dialogConfig.disableClose=true;
  //   dialogConfig.autoFocus=true;
  //   dialogConfig.width="68%";
  //   this.dialog.open(UserComponent,dialogConfig);
  // }


  onDelete(ob:any,id:any,rev:any){
    this.dbservice.deldata(id,rev)
    // .(
    //  (data)=>{
    //    console.log(data);
    //    this.ngOnInit();
    //  }),err=>{
    //     console.log("Error");  
    //  }

    
    //return this.dbservice.getAll();
    this.getAlll();
  }
  // letusSee(ob:Object){
  //  console.log("OB");
  //  console.log(ob);
  // }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(UserComponent, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  
    
  


  getAlll(){
    this.dbservice.getAll().then(res => {
      console.log(res);
     this.ob=res.rows;
     this.users=this.ob;
     console.log(this.ob);
  })
  }

  descSorted(){
    this.dbservice.sortDta().then(result=>{
      console.log(result);
      this.srtUs=result.rows;
      this.ob=this.srtUs;
    })
  }

  checkValue(event: any){
    if(event==="ob")
       this.getAlll();
    else {
         this.descSorted();
    }
      
   // console.log(event);
   // console.log(this.ob);
    //console.log(this.srtUs);
    //this.getAlll();
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

  
  showModal(obj:object,id:any,rev:any): void {
    this.isVisible = true;
    this.loadform(obj);
    // this.populateform(obj);
    this.curId=id;
    this.curRev=rev;
    //console.log(this.curId,this.curRev);
  }

  showModalS(){
    this.isVisibleS = true;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.userform.reset();
    for (const key in this.userform.controls) {
      this.userform.controls[key].markAsPristine();
      this.userform.controls[key].updateValueAndValidity();
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleCancelS(): void {
    console.log('Button cancel clicked!');
    this.isVisibleS = false;
  }

}





