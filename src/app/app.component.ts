import { Component } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'crud-app';
  

  constructor(public db: DbService) {
    // this.db.create();
    // setTimeout(() => {
    //  this.db.getAll() 
    // }, 1000);
  }
}
