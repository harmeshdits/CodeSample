/* core modules */
import { Component, Inject } from '@angular/core';
/* models */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersManagementModel } from '../../Models/UserManagement.model';


const ELEMENT_DATA: any = [
    {userId: 1, userName: 'Admin', email: 'admin@admin.com', firstName: 'Admin', lastName:'bloomrunner', roles:'Admin, Manager', createdAt:'	Septemebr 7,2020', status:'Completed'},   
    {userId: 2, userName: 'Admin', email: 'admin@admin.com', firstName: 'Admin', lastName:'bloomrunner', roles:'Admin, Manager', createdAt:'	Septemebr 7,2020', status:'Completed'},   
    {userId: 3, userName: 'Admin', email: 'admin@admin.com', firstName: 'Admin', lastName:'bloomrunner', roles:'Admin, Manager', createdAt:'	Septemebr 7,2020', status:'Completed'},   
    {userId: 4, userName: 'Admin', email: 'admin@admin.com', firstName: 'Admin', lastName:'bloomrunner', roles:'Admin, Manager', createdAt:'	Septemebr 7,2020', status:'Completed'},   
    {userId: 5, userName: 'Admin', email: 'admin@admin.com', firstName: 'Admin', lastName:'bloomrunner', roles:'Admin, Manager', createdAt:'	Septemebr 7,2020', status:'Completed'},   
];

@Component({
    selector: 'app-user-activity',
    templateUrl: './UserActivityModel.component.html',
    //styleUrls: ['./UserActivityModel.component.scss']
})
export class UserActivityComponent {
    public model:UsersManagementModel=new UsersManagementModel();
    public data: any;

    public displayedColumns = ['srNo', 'orderName', 'orderType', 'orderDate'];
    public dataSource = ELEMENT_DATA;

    constructor(private dialogRef: MatDialogRef<UserActivityComponent>,
        @Inject(MAT_DIALOG_DATA) data) { 
            this.data = data;
        }

    public closeDialog():void {
        this.dialogRef.close();
    }
    public onSubmit():void {
        this.dialogRef.close({ data: this.model })
    }
}