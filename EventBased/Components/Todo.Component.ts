import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-todo',
    templateUrl: 'Todo.Component.html'  
})


export class TodoComponent {

  public loading: boolean = true;

  constructor(private router: Router) {  
      this.router.events.subscribe((event) => {
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
}