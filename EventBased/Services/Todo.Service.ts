/*Angular core modules*/
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TodoService {
      public GetTodo(){
          // going to get backend...   
      } 
      public POSTTODO (data):Observable<any>{
        // going for save it on backend...
          return of(data);
      } 
      
      public UPDATETODO (id,input:any):Observable<any>{
        // going for update it on backend...
          return of(input);
      }

      public DeleteTodo(id):Observable<any>{        
        return of(id)
      }
  }