/*** Core angular modules ***/ 
import { Component } from '@angular/core';

/*** Models and classes ***/ 
import { Colors,Todos } from "../../Models/Todo.Model";
import {TimeMachine} from '../../Models/HistoryModel';

/***  NgRx modules ***/ 
import { TodoDeleteRequest, TodoPostRequest, TodoUpdateRequest } from '../../Store/Todo.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTodos } from '../../Store/Todo.selector';
import { Update } from '@ngrx/entity';

/*** Angular material ***/
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
    selector: 'app-todo-list',
    templateUrl: './TodoList.Component.html',
    styleUrls:['./ToDoList.Component.scss'],
   
})
export class TodoListComponent {
    public opened: boolean; 
    public note:string;
    public selectedColor: string;
    public colors =new Colors().List;
    public storeList$:Observable<any>;
    public todoModel = new Todos();
    private timemachine:TimeMachine;
    

    constructor( private store: Store<Todos>,private _snackBar : MatSnackBar) {        
          this.storeList$=  this.store.select(selectTodos);
    }

    /// Update todo task on backend as then change state in NgRx store
    public UpdateToDoTask($event){
       this.timemachine.CurrentVal=$event.curr;
       this.timemachine.PastVal=$event.prev;
       this.timemachine.action="update";
       this.timemachine.id=$event.curr.id;
       const update: Update<Todos> = {
                    id: this.timemachine.id,
                    changes: {
                       ...this.timemachine.CurrentVal
                    }
                };
       this.store.dispatch(TodoUpdateRequest({update:update}));
       this.ToDoSnackBar();
    }

     /// Delete todo task from backend as well from NgRx store
    public DeleteToDoTask($event){
        this.timemachine.CurrentVal=$event;
        this.timemachine.action="delete";
        this.timemachine.id=$event.id;
        this.store.dispatch(TodoDeleteRequest({TodoId:$event.id}));
        this.ToDoSnackBar();
    }

    /// Save new todo task in NgRx store
    public SaveToDo(color):void{
        this.todoModel.id=this.GetTicks();        
        this.todoModel.note=this.note;
        //this.selectedColor= null
        this.todoModel.color=color.colorCode;
        this.store.dispatch(TodoPostRequest({Todo:this.todoModel}));
        this.timemachine=new TimeMachine(this.todoModel.id,null,this.todoModel,"add");
        this.todoModel=new Todos();
        this.note="";
        this.ToDoSnackBar();
    }

    /// Use date ticks as a unique todo task id
    private GetTicks(){
        var date=new Date();
        return date.getTime();
    }

    // Todo task notification after Save,update and Detete Operation
    // Undo the previous state
    private ToDoSnackBar():void {
        let snackBarRef = this._snackBar.open("Success!!!", 'Undo', {
          duration: 2000
        });
      
        snackBarRef.onAction().subscribe(() => {        
          if(this.timemachine.action==='add'){
              this.store.dispatch(TodoDeleteRequest({TodoId:this.timemachine.id}))
          }  
          else if(this.timemachine.action==='update')  
          {
            const update: Update<Todos> = {
                id: this.timemachine.id,
                changes: {
                   ...this.timemachine.PastVal
                }
            };
              this.store.dispatch(TodoUpdateRequest({update:update}));
          }
          else if(this.timemachine.action==="delete"){
            this.store.dispatch(TodoPostRequest({Todo:this.timemachine.CurrentVal}));
          }
        });
    }

    setSelectedColor(color){        
        this.selectedColor=color;
    }

}