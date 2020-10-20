import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/* third party modules */
import * as _ from 'lodash';

@Component({
  selector: 'app-actions',
  template: `<span class='tagCol label-light-primary' *ngFor='let role of roles'>{{role.RoleName}} </span>&nbsp;&nbsp;`,
})
export class GridRolesComponent implements ICellRendererAngularComp {
  public params: any;
  public roles:any;

  agInit(params: any): void {
    this.params = params;
    this.roles = JSON.parse(this.params.data.userRols);

  }

  refresh(): boolean {
    return false;
  }
}

