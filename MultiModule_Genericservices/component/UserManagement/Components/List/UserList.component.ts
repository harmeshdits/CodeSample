/*Angualr Core Modules*/
import { Component, OnInit} from "@angular/core";
import { Observable } from "rxjs";

/*Models*/ 
import { UsersManagementModel } from '../../Models/UserManagement.model';

/* Ngrx store */
import { select, Store } from '@ngrx/store';
import { UserState } from '../../State/User.reducer';
import { Users, areUsersLoaded, isLoading, showError } from '../../State/User.selectors';

/*** Services ***/ 
import { NgxSpinnerService } from "ngx-spinner";
import { UserRequestModel } from '../../Models/UserRequest.model';
import { UserService } from '../../Services/User.service';

@Component({
    selector:'app-user-List',
    templateUrl:'./UserList.component.html',
    styleUrls: ['./UserList.component.scss']
})
export class UserListComponent implements OnInit {
      
  public usersData$: Observable<UsersManagementModel[]>;
  public isLoaded$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public anyError$: Observable<any>;
  public firstFlorist$: Observable<any>;
  public userDataList: any = [];
  public agGridEnable:boolean = false;

  constructor(
    private store: Store<UserState[]>, private spinner: NgxSpinnerService, private userSerive: UserService   
  ) { 
   
  }
  ngOnInit(): void { 
    this.spinner.show();
    this.usersData$ = this.store.pipe(select(Users));   
    this.isLoaded$ = this.store.select(areUsersLoaded);
    this.isLoading$ = this.store.select(isLoading);   
    this.anyError$ = this.store.select(showError);
    setTimeout(() => {
        this.spinner.hide();
    }, 2000);
  }

  /// Delete user
  DeleteUser(data){    
    console.log(data);
  }

  pageNo: number = 1;
  public LoadMoreRecords(){    
    // const requestModel = new UserRequestModel();   
    // requestModel.PageNo = 2;
    const inputParams = new UserRequestModel();
    inputParams.PageNo = this.pageNo ++;
  
    this.userSerive.GetStaffList(inputParams).subscribe(res=>{
      this.userDataList.push(JSON.stringify(res));
      console.log(this.userDataList)
    })
      // this.store.dispatch(userAction.UsersLoadRequest({User:inputParams}))
  }

}