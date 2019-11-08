import { Injectable, Component } from '@angular/core';
import PouchDB from 'pouchdb-browser';
import { EventEmitter } from 'protractor';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { AdminComponent } from './admin/admin.component';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: any;
  //date
  private isInstantiated:boolean;
  //private listener: EventEmitter<any>=new EventEmitter();
     // this.db = new PouchDB('db');
  //console.log("Database created successfully");
   
  docs:Object;

  public constructor() { 

    //var PouchDB = require('PouchDB');

    //Creating the database object
    //var db = new PouchDB('FormDB');
     var db;
    // if(!this.isInstantiated){
     
    //this.db = new PouchDB('FormDet');
    
    this.db=new PouchDB('FormDB');
    
    console.log("Database created successfully");
    

  var docs;
   

    doc:Object;
    
    // let doc = {
    //   _id : '001',
    //   name: 'Sid',
    //   age : 23,
    //   designation : 'Designer'
    //   }
   //Inserting Document



  //  db.put(doc, function(err, response) {
  //     if (err) {
  //        return console.log(err);
  //     } else {
  //        console.log("Document created Successfully",response);
  //     }
  //  });


  


    // db.post({
    //   title: 'Ziggy Stardust'
    // }).then(function (response) {
    //   // handle response
    // }).catch(function (err) {
    //   console.log(err);
    // });
  }

  // ngOnInit{

  // }
  
  putdata(doc:object){
    this.db.put(doc, function(err, response) {
      if (err) {
         return console.log(err);
      } else {
         console.log("Document created Successfully",response);
      }
   });
  //this.db.post(doc);
  }

  postdata(doc:string){
    let __id:String;
    //this.id=doc["Email"];
    let obj:object;
    obj=JSON.parse(doc);
    console.log(obj["Email"]);
    __id=obj["Email"];
    //var str="Email";
    //console.log(doc[);
    this.db.post({
      id:__id,
      obj
    }).then((response) => {
      console.log(response)
      // handle response
    }).catch(function (err) {
      console.log(err);
    });

  }


  putdta(doc:string){
    let __id:String;
    //this.id=doc["Email"];
    let obj:object;
    obj=JSON.parse(doc);
    console.log(obj["Email"]);
    __id=obj["Email"];
    //var str="Email";
    //console.log(doc[);
    this.db.put({
      _id:__id,
      obj
    }).then((response) => {
      console.log(response)
      // handle response
    }).catch(function (err) {
      console.log(err);
    });

  }

  public getdata(id:any){
  this.db.get(id).then((doc)=>{
    return doc;
  });
  }
  
  //d:any;
  getdta(id:any){
    this.getAll()
    // this.db.get(id).then(function (doc) {
    //   return doc;
    //   // handle doc
    //   //console.log(doc);
    //   console.log("this is data");
    // }).catch(function (err) {
    //   console.log(err);
    // });
  }


  getQ(id:string){
    this.db.find({
      selector: {id: {$eq: id}}
    }).then(function (result) {
      // handle result
    }).catch(function (err) {
      console.log(err);
    });
  }

  updDetA(objc:any,id:any,rev:any){
    console.log(objc);
    //let f=objc.FirstName;
    //console.log(f);
    let _doc_id_rev:any;
    //console.log(id,rev);

      this.db.get(id,(err, retrieved)=>{
        if(err){
          console.log(err)
        }
        else{
        this.db.put({
          
          _id: id,
          _rev:rev,
         obj:{
           FirstName:objc.FirstName,
           LastName:objc.LastName,
           Email:objc.Email,
           pass:retrieved.obj.pass,
           rpass:retrieved.obj.rpass,
        //     address:{
        //   street:objc.address.street,
        //    zip:objc.address.zip,
        //  }
           addresses:objc.addresses
         }
    
        }, (err, response)=>{
    
          if(err){  
        console.log(response);
        console.log("COULDN'T CHANGE UPDATE STATUS");
        
          }
        });
      }
      
        });
  }
  
  updDet(objc:any,id:any,rev:any){
    console.log(objc);
    //let f=objc.FirstName;
    //console.log(f);
    let _doc_id_rev:any;
    //console.log(id,rev);

      this.db.get(id,(err, retrieved)=>{
        if(err){
          console.log(err)
        }
        else{
        this.db.put({
          
          _id: id,
          _rev:rev,
         obj:{
           FirstName:objc.FirstName,
           LastName:objc.LastName,
           Email:objc.Email,
           pass:retrieved.obj.pass,
           rpass:retrieved.obj.rpass,
        //     address:{
        //   street:objc.address.street,
        //    zip:objc.address.zip,
        //  }
           addresses:objc.addresses
         }
    
        }, (err, response)=>{
    
          if(err){  
        console.log(response);
        console.log("COULDN'T CHANGE UPDATE STATUS");
        
          }
          else{
            this.db.get(id).then(doc=>{
              console.log(doc);
              doc=btoa(JSON.stringify(doc));
    console.log(doc);
    localStorage.setItem('loggedUser',doc); 

            })
          } 
    
      });
    }
    
      });
    



//     this.db.get(id).then((doc)=> {
//       console.log(doc);
//       console.log("Hello Doc");
//       return this.db.put({  
//       // return this.db.post({
//         _id: id,
//         _rev:rev,
//          obj:{
//            FirstName:objc.FirstName,
//           LastName:objc.LastName,
//            Email:objc.Email,
//             address:{
//           street:objc.address.street,
//            zip:objc.address.zip,
//          }
//          },

      
//       }).then((response) => {
//         console.log(response);
       
//         // handle response
//       }).catch(function (err) {
//         console.log(err);
//       });
     
// })

var changes = this.db.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
  // handle change
   
}).on('complete', function(info) {
  // changes() was canceled
}).on('error', function (err) {
  console.log(err);
});

// .then(function () {
//       return this.db.get('FormDet');
// }).then(function (doc) {
//       console.log(doc);
// });
    
    // this.db.bulkDocs([
    //   {FirstName:objc.FirstName,
    //   LastName:objc.LastName, 
    //   Email:objc.Email, 
    //   street:objc.address.street, 
    //   zip:objc.address.zip,
    //     _id: id,
    //     _rev:rev},
      
    // ]).then(function (result) {
    //   // handle result
    // }).catch(function (err) {
    //   console.log(err);
    // });
//  doc={
//       obj:objc,
//       _id: id,
//       _rev:rev, 
//  }
//     this.db.put(doc);
//     return this.db.get(id, function(err, doc) {
//       if (err) {
//          return console.log(err);
//       } else {
//          console.log(doc);
//       }
//    });

  }



  

  
  //  public fetch(){
  //    return this.db.allDocs({include_docs:true});
  //  }

  //  public get(id:string){
  //    return this.db.get(id);
  //  }

    // db.info((err,info) => {
    //   if(!err){
    //       console.log(info)
    //   }
    // });
   

  // create() {
  //   this.db.post({ test: 'test'});  
  // }
 

  getAll() {
    return this.db.allDocs({
      include_docs: true,
      //attachments: true
    });
  }

  deldata(id:any,rev:any){
    return this.db.remove(id,rev);
    //return this.getAll();
  }
  
  sortDta(){
   return this.db.allDocs({include_docs: true,descending: true});
  }

  updPass(objc:any,id:any,rev:any){
    console.log(objc);
    console.log(id,rev);
      this.db.get(id,(err, retrieved)=>{
        if(err){
          console.log(err)
        }
        else{
        this.db.put({
          
          _id: id,
          _rev:rev,
         obj:{
           FirstName:retrieved.obj.FirstName,
           LastName:retrieved.obj.LastName,
           Email:retrieved.obj.Email,
           pass:objc.NewPass,
           rpass:objc.NewRPass,
            address:{
          street:retrieved.obj.address.street,
           zip:retrieved.obj.address.zip,
         }
         }
    
        }, (err, response)=>{
    
          if(err){  
    
        console.log("COULDN'T CHANGE UPDATE STATUS");
    
          } 
    
      });
    }
    
      });
    
    }







  

  // public getChangeListener(){
  //   return this.listener;
  // }



}
