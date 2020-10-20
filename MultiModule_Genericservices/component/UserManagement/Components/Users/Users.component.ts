/*Angular Core Modules*/ 
import { Component, OnInit } from "@angular/core";
import { Event, NavigationEnd, NavigationCancel, NavigationError,  NavigationStart, Router } from '@angular/router';

@Component({
    selector:'Users',
    templateUrl:'./Users.component.html',
    styleUrls: ['./Users.component.scss']
})
export class UsersComponent implements OnInit {
      
  public loading: boolean = true;

  constructor(private router: Router) {
  
      this.router.events.subscribe((event: Event) => {
          if(event instanceof NavigationStart || event instanceof NavigationError){
              this.loading = true; 
          }
          if(event instanceof NavigationEnd || event instanceof NavigationCancel){
              setTimeout(()=>{                         
                  this.loading = false;
             }, 1500);
          }           
      });
  }

  ngOnInit(): void {    }
 
}