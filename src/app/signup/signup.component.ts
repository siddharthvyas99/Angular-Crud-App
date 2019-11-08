import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
//import { ErrorStateMatcher } from ;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

// export class PassErrShow implements ErrorStateMatcher{

// }


export class SignupComponent implements OnInit {
 signbgpic:any;
  invalidUserNames=[];
  signupForm:FormGroup;
  ps:any;
  rps:any;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  //  signupForm=new FormGroup({
  // FirstName:new FormControl('Sid',Validators.required),
  // LastName:new FormControl('V',Validators.required),
  // Email:new FormControl('sid@gml.com',[Validators.required,Validators.pattern(this.emailPattern)]),
  // pass:new FormControl('sdmmsm',Validators.required),
  // rpass:new FormControl('sdmmsm'),
  // address: new FormGroup({
  //   street: new FormControl('smcdmcsocm',Validators.required),
  //   zip: new FormControl('smcodmcmsc',Validators.required)
  // })

  // });

  //  signupForm=this.fb.group({
  //     FirstName:[null,Validators.required],
  //     LastName:[null, Validators.required],
  //     Email:[null,[Validators.required,Validators.email]],
  //     address: this.fb.group([{
  //       street: [null,Validators.required],
  //       zip: [null,Validators.required],
  //     }]),
  //     pass:[null,Validators.required],
  //     rpass:[null],
  //     },{validator: this.checkPassword});

  constructor(private fb:FormBuilder,private dbservice:DbService,private router:Router) {
    this.signbgpic="assets/signup/signup-bg.jpg";

    


   }

  ngOnInit() {
    this.signupForm=this.fb.group({
      FirstName:['Sid',Validators.required],
      LastName:['V', Validators.required],
      Email:['sid@gml.com',[Validators.required,Validators.pattern(this.emailPattern)]],
      pass:['sdmmsm',Validators.required],
      rpass:['sdmmsm'],
     
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
  initAddress() {
    // initialize our address
    return this.fb.group({
        street: ['', Validators.required],
        postcode: ['',Validators.required]
    });
}
addAddress() {
  // add address to the list
  const control = <FormArray>this.signupForm.controls['addresses'];
  control.push(this.initAddress());
}

removeAddress(i: number) {
  // remove address from the list
  const control = <FormArray>this.signupForm.controls['addresses'];
  control.removeAt(i);
}



  

  invalidNames(control:FormControl): {[s: string]: boolean} {
if(this.invalidUserNames.indexOf(control.value)!==-1){
  return {'NameInvalid':true};
}
 return null;
  }
  //can also use async validator here

  checkPassword(gp:any){
    let psw=gp.controls.pass.value;
    let rpsw=gp.controls.rpass.value;

    return psw===rpsw?null:{notmatch:true}
  }

  onSubmit(formdata:FormGroup){
    console.log(formdata.value);
    console.log(JSON.stringify(formdata.value));
  //  localStorage.setItem('Entry',JSON.stringify(formdata.value));
   //DbService.postdata(formdata.value);
  try{this.dbservice.putdta(JSON.stringify(formdata.value));
    this.router.navigate(['/login']);
  }
  catch(e){
    console.log(" Error:",e);
  }
  }
}
