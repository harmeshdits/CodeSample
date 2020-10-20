/*Core Modules*/
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/* Third party modules */
import * as _ from 'lodash';

/*Materil modules*/
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

/*Services*/
// import { UserService } from '../../../Services/User.service';
import { UserActivityComponent } from '../../../Modals/UserActivity/UserActivityModel.component';
import { UsersManagementModel } from '../../../Models/UserManagement.model';

/* Components */
import { GridActionsComponent } from './rendererComponents/actions.component';
import { GridEditEmailComponent } from './rendererComponents/editEmail.component';
import { GridRolesComponent } from './rendererComponents/roles.component';
import { ColumnComponent } from '../../../Modals/column/column.component';
import { GridStatusComponent } from './rendererComponents/status.component';

let dial ;
@Component({
    selector:'app-grid-list-presentation',
    templateUrl:'./AgGridPresentation.component.html',
    styleUrls: ['./AgGridPresentation.component.scss']
})
export class AgGridListPresentationComponent implements OnChanges {
  
  /*Column display on the table*/
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort', { static: true }) sort: MatSort;
  public dataSource: MatTableDataSource<UsersManagementModel>;
  public displayedColumns: string[] = ['email', 'firstName','lastName','roles','status','action'];

  /* -- ag-grid-- */
  public columnDefs;
  public defaultColDef;
  public defaultColGroupDef;
  public rowData;
  public frameworkComponents;
  public context;

  /* models and properties */
  @Input() public result: Array<UsersManagementModel> = [];
  @Input() public isLoading: boolean;
  @Output() public onUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onDeleted: EventEmitter<number> = new EventEmitter<number>();

  //get data from list component html
  @Input() listData: Array<UsersManagementModel> = [];

  
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  filterStatus = '';
  filterCondition = '';  
  constructor(
    // private userSerivce : UserService, 
    private router: Router,
    public dialog: MatDialog
  ) { 
     this.columnDefs = [
      { field: 'email', sortable: true,filter:true,lockVisible:true,cellRenderer:'editEmailRenderer', width: 225},
      { field: 'firstName', sortable: true, filter:true, width: 150 },
      { field: 'lastName', sortable: true, filter:true,  width: 150},
      { field: 'roles', sortable: true, filter:true, cellRenderer: 'rolesRenderer', width: 175 },
      { field: 'status', sortable: true, filter:false, cellRenderer: 'statusRenderer', width: 125},
      { field: 'action', filter:false,lockVisible:true,cellRenderer: 'actionRenderer' }
    ];

    this.defaultColDef = {
      width: 250,
      editable: false,
      floatingFilter: false,
      resizable: true,
    };

    this.context = { componentParent: this };

    this.frameworkComponents = {
        actionRenderer:GridActionsComponent,
        editEmailRenderer:GridEditEmailComponent,
        rolesRenderer:GridRolesComponent,
        statusRenderer:GridStatusComponent
    };
  }
  ngOnChanges() {  
    this.dataSource = new MatTableDataSource(this.result); 
    this.rowData = this.result;
    dial = this.dialog;
  }
  
  /*View User activity*/
  public viewActivity(): void {
    const addDialogRef = this.dialog.open(UserActivityComponent, {
        width: '640px', disableClose: true
    });
    addDialogRef.afterClosed();
    // .subscribe((user: UsersManagementModel) => {

    // });
  }

  parseJson(obj){
    return JSON.parse(obj)
  }

  /*show/hide update status option*/
  public statusEdit(pvarData){
    pvarData.isStatusEdit = !pvarData.isStatusEdit;
  }

  /*Update user status*/
  public updateStatus(pvarData){
    pvarData.isStatusEdit = !pvarData.isStatusEdit;
  } 


	/*Delete user */
	public deleteUser(_item: UsersManagementModel) {

    // const _title = 'User Delete';
		// const _description = 'Are you sure you want to permanently delete this user?';
		// const _waitDesciption = 'User is deleting...';

		// const dialogRef = this.userSerivce.deleteElement(_title, _description, _waitDesciption);
		// dialogRef.afterClosed().subscribe(res => {  
		// 	if (!res) {
		// 		return;
		// 	}	
		// });
  }
  

  

  public addNewUser(){
    this.router.navigateByUrl('/admin/um/add');
  }

   //update florist method
   public updateUser(row) {
      this.onUpdated.emit(row);
  }

  //delete florist method
  public deleteSelectedUser(id) {
      this.onDeleted.emit(id);
  }

  edit(pvarData){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "uId": pvarData.staffId,
      }
    };
    this.router.navigate(["/admin/um/add"], navigationExtras);  
  }

  //ag grid
  public getMainMenuItems(params) {
    switch (params.column.getId()?'1':'0') {
      case '1':
      let MenuItems = params.defaultItems.slice(0);
        MenuItems.push({
                name: 'Rename Header',
                action:() => {
                  const columnDialogRef = dial.open(ColumnComponent, {
                  width: '640px', disableClose: true
                });
                columnDialogRef.afterClosed().subscribe(data => {
                  if(data){
                  params.api.getColumnDef(params.column.getId()).headerName = data;
                  params.api.refreshHeader();
                  }
                }); 
              }
        });
      return MenuItems;
    }
  }
 
}