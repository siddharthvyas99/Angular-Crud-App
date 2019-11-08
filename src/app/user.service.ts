import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import * as _ from 'lodash'; 
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

 userform:FormGroup;
  ob:any=[];
  
 
    
    
  constructor(private fb:FormBuilder,private dbservice:DbService) { 
    this.userform =this.fb.group({
      FirstName:[''],
      LastName:[''],
      Email:[''],
      address: this.fb.group({
        street: [''],
        zip: ['']
      }),
      pass:[''],
      rpass:['']
      });
  }

  ngOnInit(){
    console.log('Dashboard HI');
    this.dbservice.getAll().then(res => {
      console.log(res);
     this.ob=res.rows;
     console.log(this.ob);
  })
  }

  // userform:FormGroup =new FormGroup({
  //   FirstName:new FormControl('',Validators.required),
  //   LastName:new FormControl('',Validators.required),
  //   Email:new FormControl('',[Validators.required,Validators.email]),
  //   address: new FormGroup({
  //     street: new FormControl('',Validators.required),
  //     zip: new FormControl('',Validators.required)
  //   }),
  //   pass:new FormControl(''),
  //   rpass:new FormControl('')
  //   });
  
  
    initializeUser(ob:object){
     // let ob:object=vr;
     
      console.log("fsffdf");
      console.log(ob);
      // console.log(ob.address.street);

      this.userform.patchValue(ob, {onlySelf:true});
    //   this.userform.setValue({
    //     FirstName:ob.FirstName,        
    //     LastName:ob.LastName,
    //   Email:ob.Email,
    //   address: {
    //   street: ob.address.street,
    //   zip: ob.address.zip
    //   },
    // pass:ob.pass,
    // rpass:ob.rpass
    //   });
      console.log(this.userform);

    //this.userform.setValue(_.omit(ob,''));
    }

    populateform(ob:object){
      this.userform.patchValue(ob, {onlySelf:true});

    }
}
