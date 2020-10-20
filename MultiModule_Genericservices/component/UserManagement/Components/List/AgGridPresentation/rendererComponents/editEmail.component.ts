import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actions',
  template: `<a mat-icon-button color="primary" matTooltip="Edit" (click)="edit()">
                {{params.data.email}}
              </a> `,
})
export class GridEditEmailComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public edit() {
    this.params.context.componentParent.edit(
      this.params.data
    );
  }

  refresh(): boolean {
    return false;
  }
}

