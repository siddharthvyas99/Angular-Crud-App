import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

// export interface DialogData {
//   animal: string;
//   name: string;
// }


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // userform : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
   private service:UserService,
   private fb : FormBuilder
   ) {
    // this.userform =this.fb.group({
    //   FirstName:[''],
    //   LastName:[''],
    //   Email:[''],
    //   address: this.fb.group({
    //     street: [''],
    //     zip: ['']
    //   }),
    //   pass:[''],
    //   rpass:['']
    //   });
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  // getUserById(data) {
  //   console.log(data);
  //   this.userform.patchValue(data, {onlySelf : true});
  // }

  onSubmit(){
    console.log("Hello Worrrrld");
  }
}
