/* angular core modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* components */
import { UsersComponent } from "./Components/Users/Users.component";
import { AddUserComponent } from './Components/AddUser/AddUser.component';
import { UserTasksComponent } from './Components/Tasks/Tasks.component';
import { UserListComponent } from './Components/List/UserList.component';

/* resolvers and guard */
import { UsersResolver } from './RouterResolver/Users.router.resolver';
import { HasUnsavedDataGuard } from './Guard/Unsavedata.guard';


/* Routes*/
const routes: Routes = [  
  {
    path: '',
    component: UsersComponent,
    children: [ 
      { path: 'users', component: UserListComponent, },
      { path: 'add',component: AddUserComponent,resolve:{users:UsersResolver}, canDeactivate: [HasUnsavedDataGuard]},     
      { path: 'tasks', component: UserTasksComponent},
      { path: '', component:  UserListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
