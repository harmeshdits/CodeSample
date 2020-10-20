/** angular core modules **/
import { Component, Input, Output, EventEmitter } from '@angular/core';

/** Models and classes **/
import { Todos } from '../../../Models/Todo.Model';
import { ModelResponse } from '../../../Models/ModalResponse';

/** custom pipes **/
import { FilterTodosPipe } from '../../../Pipes/Todo.pipe';

/** dialog and componenets **/
import { MatDialog } from '@angular/material/dialog';
import { TodoModalComponent } from '../../../Modals/Todo/TodoModals.Component';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-todo-presentation',
  templateUrl: './TodoListPresentation.Component.html',
  providers: [FilterTodosPipe]
})
export class TodoListPresentationComponent implements OnChanges{
  public cards: Array<Todos> = new Array<Todos>();
  public colorArray=[];
  public toDoLength:number=0;
  @Input() public toDosList: any;
  @Input() public filterColor: any;

  @Output() updateNoteEvent = new EventEmitter<any>();
  @Output() deleteNoteEvent = new EventEmitter<Todos>();
  @Output() addNoteEvent = new EventEmitter<Todos>();

  constructor(public dialog: MatDialog) {}

  ngOnChanges(input){
    if(input && input.toDosList){
      this.toDoLength= Object.keys(input.toDosList.currentValue).length;
    }
  }

  public editTodo(input: Todos): void {
    const addDialogRef = this.dialog.open(TodoModalComponent, {
      width: '640px',
      disableClose: true,
       data: input,
    });
    addDialogRef.afterClosed().subscribe((output: ModelResponse) => {
      if (output._status) {
        this.deleteToDd(output._todo);
      } else {
        var prevModel = this.toDosList[input.id];
        this.updateNoteEvent.emit({ prev: prevModel, curr: output._todo });
      }
    });
  }

  public deleteToDd(todo: Todos): void {
    this.deleteNoteEvent.emit(todo);
  }
}
