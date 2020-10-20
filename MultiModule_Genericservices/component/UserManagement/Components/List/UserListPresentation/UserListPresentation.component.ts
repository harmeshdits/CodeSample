/*** Angular Core Modules ***/
import { Component, ViewChild, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/*** Material modules ***/
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';

/*** Services ***/
import { UserService } from '../../../Services/User.service';

/*** Models and classes ***/ 
import { UserActivityComponent } from '../../../Modals/UserActivity/UserActivityModel.component';
import { UsersManagementModel } from '../../../Models/UserManagement.model';
import { DeleteModel } from '../../../Models/DeleteModal.model';
import { InfinteScrollModel } from '../../../../../../../SharedModules/Models/InfiniteScroll.Model';
import { UserRequestModel } from '../../../Models/UserRequest.model';

/*** Lodash ***/
import { union } from 'lodash';

@Component({
    selector:'app-user-list-presentation',
    templateUrl:'./UserListPresentation.component.html',
    styleUrls: ['./UserListPresentation.component.scss']
})
export class UserListPresentationComponent implements OnChanges { 
 
  /// Input/Output properties 
  @Input() public result: Array<UsersManagementModel> = [];
  @Input() public isLoading: boolean;
  @Input() listData: Array<UsersManagementModel> = [];
  @Output() public onUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteUserEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public loadMoreReqEvent: EventEmitter<any> = new EventEmitter<any>();


  /// Column display on the table 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort', { static: true }) sort: MatSort;
  public dataSource: MatTableDataSource<UsersManagementModel>;
  public displayedColumns: string[] = ['Email', 'FirstName','LastName','Roles','Status','Action'];

  private pageNo: number = 1;
  public scrollModel  = new InfinteScrollModel();  
  public requestModel = new UserRequestModel();



  constructor(private userSerivce : UserService, public dialog: MatDialog, private userService: UserService) {  }
 
  ngOnChanges() {     
    this.dataSource = new MatTableDataSource(this.result);   
  } 
  
  public viewActivity(): void {
    const addDialogRef = this.dialog.open(UserActivityComponent, {
        width: '640px', disableClose: true
    });
    addDialogRef.afterClosed();  
  }

  parseJson(obj){
    return JSON.parse(obj)
  }

  public statusEdit(pvarData){
    pvarData.isStatusEdit = !pvarData.isStatusEdit;
  }

  /// Update user status
  public updateStatus(pvarData){
    pvarData.isStatusEdit = !pvarData.isStatusEdit;
  }

	/// Delete user @param _item: User 
	public deleteUser(input: UsersManagementModel) {
    const deleteModal = new DeleteModel();
    deleteModal._id = input['staffId'];
		deleteModal._title = 'User Delete';
		deleteModal._description = 'Are you sure you want to permanently delete this user?';
		deleteModal._waitDesciption = 'User is deleting...';	
		const dialogRef = this.userSerivce.deleteElement(deleteModal);
		dialogRef.afterClosed().subscribe(res => {      
			if (!res) {        
        this.deleteUserEvent.emit(res);
			}	
		});
  }  
  
  public updateUser(row) {
      this.onUpdated.emit(row);
  }  

  /// Load more functions   
  public searchUser(val){      
      this.requestModel.SearchValue = val;   
      this.setRequesetParams()    
  }
  public empty(val){  
    if(val.length == 0){
      this.requestModel.SearchValue = "";  
      this.setRequesetParams()    
    }
  }

  private setRequesetParams(){
    this.result= [];
    this.dataSource =  new MatTableDataSource();
    this.requestModel.PageNo = 1;
    this.pageNo = 1;
    this.getUserListData();
  }
   
  public sortData(sort: Sort) {  
    this.requestModel.SortColumn = sort.active; 
    this.requestModel.SortOrder = sort.direction;    
    this.setRequesetParams();
  }  
  public loadMore(){             
    this.requestModel.PageNo =  ++this.pageNo;
    this.getUserListData();
  }

  private getUserListData(){  
    this.isLoading = true;
    this.userService.GetStaffList(this.requestModel).subscribe(res=>{    
      this.isLoading= false; 
      if(res.length > 0){
          const finalArray = union(this.result, res);        
          this.dataSource = new MatTableDataSource(finalArray);
          this.result = finalArray;
        }else{
          this.dataSource = new MatTableDataSource(this.result);
        }
    })     
  }    
  /// End Load More
 
   
}