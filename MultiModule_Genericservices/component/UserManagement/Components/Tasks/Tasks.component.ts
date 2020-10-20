/*Core Modules*/
import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

/*Material modules*/
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

/*Models*/ 
import { Tasks } from '../../Models/UserTasks.model';
import { UserManagementModule } from '../../UserManagement.module';

/*Services*/
import { UserService } from '../../Services/User.service';

@Component({
	selector: 'app-user-tasks-component',
	templateUrl: './Tasks.component.html'
})
export class UserTasksComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sortTask', { static: true }) sort: MatSort;
  public dataSource: MatTableDataSource<UserManagementModule>;

  public displayedColumns: string[] = ['Title','Description','Date','Due Date', 'Complete Date','Status','Action'];

  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  filterStatus = '';
  filterCondition = '';
  

  constructor(
    private userSerivce : UserService, 
    private router: Router,  
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) { 
   
  }

  ngOnInit(): void {  
    this.userSerivce.getTasks()
      .subscribe((res)=>{              
        this.dataSource = new MatTableDataSource( res );
        this.dataSource.paginator = this.paginator;
      })
  }
  
	deleteTask(_item: Tasks) {    
    }
    
    //Go back user list
    public goBackWithoutId() {
        this.router.navigateByUrl('/admin/um/users', { relativeTo: this.activatedRoute });
      }
  
}