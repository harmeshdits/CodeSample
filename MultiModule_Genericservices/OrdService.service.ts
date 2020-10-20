/*Core module*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../../../environments/environment';

/*Model calss*/
import { OrdersLists } from '../Models/OrdersModel/OrdLists.model';

/*import shared services*/
import { SharedHttpService } from 'projects/Admin/src/app/SharedModules/Services/http.service';
import { map } from 'rxjs/operators';
import { DeleteEntityDialogComponent } from '../../../SharedModules/Modals/delete-entity-dialog/delete-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';




@Injectable()
export class OrdersService extends SharedHttpService<OrdersLists> {

  APIUrl: string = `${environment.crmApiGateway}`;
  public httpObj;
  Url: string = `${environment.apiGateway}`;


  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    super(`${environment.crmApiGateway}`, http, 'Staff');
  }
  public getColorCodes(): Observable<any> {
    return this.http.get("assets/json/colors.json");
  }
  public getOrderStatus(id: number): Observable<any> {
    this.httpObj = new SharedHttpService(this.APIUrl, this.http, `Order/${id}`);
    return this.httpObj.get();
  }

  public list(endPoint: string, params): Observable<any> {
    this.httpObj = new SharedHttpService(this.APIUrl, this.http, `Order/` + endPoint);
    return this.httpObj.getDetailById(params);
  }
  public getFlowers(): Observable<any> {
    return this.http.get("assets/json/flowers.json");
  }
  public getCustomerData(params): Observable<any> {
    return this.http.get(`${this.APIUrl}/Customer/GetCustomer?`, { params: params });
  }
  public getRecipientData(params): Observable<any> {
    return this.http.get(`${this.APIUrl}/Recipient?`, { params: params });
  }
  public getPlansName(params): Observable<any> {
    return this.http.get(`${this.APIUrl}/CustomerSubscriptionPlan?`, { params: params });
  }
  public addCustomer(customer): Observable<any> {
    console.log(customer);
    return this.http.post(`${this.APIUrl}/Customer`, JSON.stringify(customer), this.httpOptions)
      .pipe(map(response => response as any));
  }
  public updateCustomer(customer): Observable<any> {
    console.log(customer);
    return this.http.put(`${this.APIUrl}/Customer`, JSON.stringify(customer), this.httpOptions)
      .pipe(map(response => response as any));
  }
  public addRecipient(recipient): Observable<any> {
    console.log(recipient);
    return this.http.post(`${this.APIUrl}/Recipient`, JSON.stringify(recipient), this.httpOptions)
      .pipe(map(response => response as any));

  }

  public getGlobalCode(params) {
    return this.http.get(`${this.Url}/GlobalCode/GetGlobalCode?`, { params: params });
  }
  public openDialog(title: string = '', description: string = '', waitDescription: string = '', isPrompt: boolean = false) {
    return this.dialog.open(DeleteEntityDialogComponent, {
      data: { title, description, waitDescription, isPrompt },
      width: '440px'
    });
  }

  public deleteElement(title: string = '', description: string = '', waitDescription: string = '') {
    return this.dialog.open(DeleteEntityDialogComponent, {
      data: { title, description, waitDescription },
      width: '440px'
    });
  }

  public getTimeSlots() {
    this.httpObj = new SharedHttpService(this.Url, this.http, 'TimeSlot')
    return this.httpObj.get();
  }
  public searchProductByTags(params) {
    return this.http.get(`${this.APIUrl}/SearchProductsByTags/GetlistSearchProductsByTags?`, { params: params });
  }
  public getStatesValue() {
    return this.http.get(`${this.Url}/State`);
  }

  public getOrdList(endPoint: string, params) {
    this.httpObj = new SharedHttpService(this.APIUrl, this.http, `Order/` + endPoint)
    return this.httpObj.getDetailById(params);
  }
  
  public updateOrderStatus(endPoint: string, inputParams): Observable<any> {
    this.httpObj = new SharedHttpService(this.APIUrl, this.http, `Order/`+ endPoint);
    return this.httpObj.update(inputParams);
    // return this.http.put(`${this.APIUrl}/ChangeOrderStatus`, JSON.stringify(inputParams), this.httpOptions)
    //   .pipe(map(response => response as any));
  }
 
}