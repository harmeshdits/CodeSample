/* angualr core modules */
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/* routing modules */
import { UserManagementRoutingModule } from './UserMangement.routing.module';

/* feature and custom modules */
import { MaterialModule } from 'projects/Admin/src/app/MaterialModule/Material.module';
import { SharedModule } from 'projects/Admin/src/app/SharedModules/Shared.Modules';
import { AdminCommonModule } from '../../AdmCM/AdminCommon.module';


/* components */
import { UserListComponent } from './Components/List/UserList.component';
import { UsersComponent } from './Components/Users/Users.component';
import { AddUserComponent } from './Components/AddUser/AddUser.component';
import { UserListPresentationComponent } from './Components/List/UserListPresentation/UserListPresentation.component';
import { UserTasksComponent } from './Components/Tasks/Tasks.component';
import { AgGridListPresentationComponent } from './Components/List/AgGridPresentation/AgGridPresentation.component';
import { GridActionsComponent } from './Components/List/AgGridPresentation/rendererComponents/actions.component';
import { GridEditEmailComponent } from './Components/List/AgGridPresentation/rendererComponents/editEmail.component';
import { GridRolesComponent } from './Components/List/AgGridPresentation/rendererComponents/roles.component';
import { GridStatusComponent } from './Components/List/AgGridPresentation/rendererComponents/status.component';
import { ColumnComponent  } from './Modals/column/column.component';

/*Modals*/
import { UserActivityComponent } from "./Modals/UserActivity/UserActivityModel.component";
import { DeleteModalComponent } from './Modals/DeleteModal/DeleteModal.component';

/* ngrx */
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './State/User.reducer';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './State/User.effects';


/* services */
import {UserService} from '../UserManagement/Services/User.service'
import { UploadService } from 'projects/Admin/src/app/SharedModules/Services/Upload.service';
import { ProductService } from '../Products/Services/Product.service';


/* route resolvers */
import { UsersResolver } from './RouterResolver/Users.router.resolver';

/* snack services */
import { SnackBarService } from 'projects/Admin/src/app/Store/SnackBarReducer/Service/SnackBar.Service';
import { SnackBarEffects } from 'projects/Admin/src/app/Store/SnackBarReducer/Facade/SnackBar.Effects';
import { SnackBarComponent } from 'projects/Admin/src/app/Store/SnackBarReducer/Component/SnackBar.component';

/* ----- ag grid----- */
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HasUnsavedDataGuard } from './Guard/Unsavedata.guard';

/*** Ngx Spinner Module ***/ 
import { NgxSpinnerModule } from 'ngx-spinner';

/*** Infinite scroll ***/ 
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [      
    UsersComponent,UserListPresentationComponent,
    UserListComponent,
    AddUserComponent,
    UserActivityComponent,
    DeleteModalComponent,
    UserTasksComponent,
    AgGridListPresentationComponent,
    GridActionsComponent,
    GridStatusComponent,
    GridRolesComponent,
    GridEditEmailComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    MaterialModule,
    AdminCommonModule,
    SharedModule,    
    StoreModule.forFeature("users", reducer),    
    EffectsModule.forFeature([UserEffects]),
    AgGridModule.withComponents([])
  ],
  providers: [UserService,ProductService, UsersResolver, SnackBarEffects,SnackBarService,SnackBarComponent, UploadService, HasUnsavedDataGuard],
  entryComponents: [
    AddUserComponent, 
    UserListComponent, 
    UserListPresentationComponent,
    AgGridListPresentationComponent, 
    GridActionsComponent,
    GridEditEmailComponent,
    GridRolesComponent,
    GridStatusComponent,
    ColumnComponent
    ]
})
export class UserManagementModule { }