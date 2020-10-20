import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actions',
  template: `<mat-slide-toggle [checked]='params.data.isActive'></mat-slide-toggle>`,
  styles:['.mat-slide-toggle{ height:45px}']
})
export class GridStatusComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params
  }

  refresh(): boolean {
    return false;
  }
}

