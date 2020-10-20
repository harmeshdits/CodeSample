/*** Angular Core ***/
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { OrdersStatus } from '../../../Models/OrdersModel/OrdStatus.model';
import { Observable } from 'rxjs';

/*** Models Classes ***/
import { OrdersTypes } from "../../../Models/OrdersModel/OrdTypes.model";
import { OrderDetailRequest } from '../../../Models/OrdersModel/OrdReqParms';
import { UpcomingOrdModel } from "../../../Models/OrdersModel/UpcOrder.model";

/*** Services ***/ 
import { OrdersService } from '../../../Services/OrdService.service';
import { OrdersLists } from '../../../Models/OrdersModel/OrdLists.model';
import { Utils } from 'projects/Admin/src/app/SharedModules/Util/Utils';
import { NgxSpinnerService } from "ngx-spinner";

import {filter} from 'lodash'

@Component({
  selector: 'app-order-presentation',
  templateUrl: './OrdPresentation.component.html',
  styleUrls: ['./OrdPresentation.component.scss']
})
export class OrdersPresentationComponent implements OnChanges {

  /// Input properties
  @Input() public ordersStatus : any;
  @Output() public eventGetOrders = new  EventEmitter()
  
  /// Global variables 
  public orderStatusData: Observable<OrdersStatus>;
  public ordersList: Array<OrdersLists> = [];
  public orederDetail$: Observable<any>;
  public deliverySchedules$: Observable<any>;
  public upcOrderModel = new UpcomingOrdModel();  
  public ordersTypes= new OrdersTypes().List;
   
  constructor( private orderService: OrdersService, private spinner: NgxSpinnerService ) {   }
  
  ngOnChanges() {      
    this.orderStatusData = this.ordersStatus['orderStatus'];    
    if(sessionStorage.getItem("orderStatusId") != null){
      const _statusId = parseInt( sessionStorage.getItem("orderStatusId") );
      this.upcOrderModel.selectedOrderSId = _statusId
      this.getOrdersByStatus(_statusId);
    }else{ 
       this.getOrdersByStatus(this.orderStatusData[0]['orderStatusId']); 
    }  
  }

  /// on days selection get orders status count
  public filterOrderStatus(id:number){
    this.upcOrderModel.dayId = id;
    this.getOrdersStatus();  
  }


/// Get order status count 
  public getOrdersStatus(){
    this.orderService.getOrderStatus(this.upcOrderModel.dayId).subscribe(res=>{
      if(res){
        this.orderStatusData = res;       
        this.upcOrderModel.selectedOrderSId = res[0]['orderStatusId'];
        this.getOrdersByStatus(res[0]['orderStatusId'])
      }
    })
  }



  /// Filter oders by status and days
  public getOrdersByStatus(sId:any){   
    this.upcOrderModel.selectedOrderSId = sId;
    let queryParams = { "Days":this.upcOrderModel.dayId,"OrderStatus":sId }    
     this.orderService.list('GetOrders', queryParams)
      .subscribe(res=>{
         if(res){           
            this.ordersList = res;
            sessionStorage.removeItem("orderStatusId");
            if(res[0] && res[0]['ordersJson']){
              const fistIndexOrderId = this.returnJsonObj(res[0]['ordersJson'])[0]['OrderId'];
              this.getOrderDetail(fistIndexOrderId); 
            }else{
              this.orederDetail$ = null
            }
         }         
      })         
  }

  /// Get order detail by id
  public getOrderDetail(orderId:number){     
    this.upcOrderModel.selectedOrderId = orderId;
    this.spinner.show();    
    let queryParams = new OrderDetailRequest;
    queryParams.OrderId = orderId;  
    this.orederDetail$ = this.orderService.list('GetOrderSummeries', queryParams); 
    if(this.upcOrderModel.selectedOrderSId > 20)
      this.upcOrderModel.recipientInfo = true;
    else
      this.upcOrderModel.recipientInfo = false;
    setTimeout(() => { this.spinner.hide()}, 1000);          
  }

  /// Return json string to object
  public returnJsonObj(str: any){
    if(str){
      let d =  Utils.parse(str);   
      return d;  
    }
  }

  /// Collapse orders rows
  public collapseRow(index){
    this.upcOrderModel.selectedOrderRow = index === this.upcOrderModel.selectedOrderRow ? -1: index;
  }

  /// Get order summary by id
  getOrdersById(){
      this.eventGetOrders.emit(this.upcOrderModel.selectedOrderId);
  }

  /// UPdate order status  
  updateOrderStatus(obj:any, prevStatusId: number){
    this.upcOrderModel.orderStatus = obj['orderStatusId'];
    const inputParams = {
      "orderId": this.upcOrderModel.selectedOrderId,
      "orderStatus": this.upcOrderModel.orderStatus,
      "modifiedBy": this.upcOrderModel.loginUserName
    }   
    this.orderService.updateOrderStatus('ChangeOrderStatus', inputParams).subscribe((res)=>{
       if(res == 1){
          obj.orderCount = obj.orderCount + 1;
          let status =  filter(this.orderStatusData, { 'orderStatusId':  prevStatusId } );      
          if(status)
            status[0]['orderCount'] = parseInt(status[0]['orderCount']) - 1;

          // get updated order after status update
          this.getOrdersByStatus(this.upcOrderModel.selectedOrderSId);   
          //console.log(this.ordersList);
       }
    });  
   
  }

  
}
