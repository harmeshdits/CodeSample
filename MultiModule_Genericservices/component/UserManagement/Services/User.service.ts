/*Core module*/
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../../../../../../environments/environment';

/*Model calss*/
import { UsersManagementModel } from '../Models/UserManagement.model';

/*import shared services*/
import { SharedHttpService } from 'projects/Admin/src/app/SharedModules/Services/http.service';

/*Component*/ 
import { DeleteModalComponent } from '../Modals/DeleteModal/DeleteModal.component';
import { UserRequestModel } from '../Models/UserRequest.model';


@Injectable()
export class UserService extends SharedHttpService<UsersManagementModel> {
   
  /// Global variables
    public APIUrl: string = `${environment.apiGateway}`;
    public httpObj;

    constructor(
      private http: HttpClient,  
      private dialog: MatDialog      
      ) { 
        super(`${environment.apiGateway}`, http,'Staff');           
    }

    public List(): Observable<any> {   
        return this.get();
    }

    public GetStaffList(model: UserRequestModel): Observable<any> {
      // let params = new HttpParams()
      //     .set('FloristId',model.FloristId.toString())
      //     .set('PageNo',model.PageNo.toString())
      //     .set('PageSiz',model.PageSize.toString())
      //     .set('SearchValue',model.SearchValue.toString())
      //     .set('SortColumn',model.SortColumn.toString())
      //     .set('SortOrder',model.SortOrder.toString())   
      
      this.httpObj = new SharedHttpService(this.APIUrl,this.http,`Staff`);
      return this.httpObj.getDetailById(model);  
    
  }
    
    public getTasks():  Observable<any> {    
        return this.get();
    }

    public getLocations(id:number):Observable<any>{ 
      this.httpObj = new SharedHttpService(this.APIUrl,this.http,`Location/${id}`);
      return this.httpObj.get();     
    }

    public getUserById(params):Observable<any>{ 
      this.httpObj = new SharedHttpService(this.APIUrl,this.http,`Staff/id/`);
      return this.httpObj.getDetailById(params);     
    }

    public getRole(): Observable<any> {
      this.httpObj = new SharedHttpService(this.APIUrl,this.http,`Roles`);
      return this.httpObj.get();
    }

    public getTag(type:string): Observable<any> {
      this.httpObj = new SharedHttpService(this.APIUrl,this.http,`TagCollection/${type}`);
      return this.httpObj.get();
    }

    public getHS(): Observable<any> {
      this.httpObj = new SharedHttpService(this.APIUrl,this.http,`HomeScreen`);
      return this.httpObj.get();
    }
    
    public deleteElement(Input) {
      return this.dialog.open(DeleteModalComponent, {
        data: Input,
        width: '440px'
      });
    } 

}