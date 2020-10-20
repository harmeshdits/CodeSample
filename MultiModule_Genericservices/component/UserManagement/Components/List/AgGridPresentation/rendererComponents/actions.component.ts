import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actions',
  template: `<button type='button' matTooltip='Delete' mat-icon-button color='warn'   (click)='deleteUser()'>
                  <mat-icon>delete</mat-icon>
              </button>
              <button type='button' matTooltip='Clone'  mat-icon-button color='primary' (click)='edit()'>
                <i class='fa fa-clone'></i>
              </button>
              <button type='button' matTooltip='Tasks' mat-icon-button color='purple' (click)='gotTasks()'>
                <i class='fa fa-list'></i>
              </button>
              <button type='button' matTooltip='User activity' mat-icon-button color='purpledark' (click)='viewActivity()'>
                <i class='fa fa-user-circle'></i>
              </button>`,
})
export class GridActionsComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public deleteUser() {
    this.params.context.componentParent.deleteUser(
      this.params.data
    );
  }
  public edit() {
    this.params.context.componentParent.edit(
      this.params.data
    );
  }
  public gotTasks() {
    this.params.context.componentParent.gotTasks(
      this.params.data
    );
  }
  public viewActivity() {
    this.params.context.componentParent.viewActivity();
  }

  refresh(): boolean {
    return false;
  }
}

