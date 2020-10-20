/*** Anglar Core Module ***/ 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

/*** Models ***/ 
import { OrdersStatus } from "../../Models/OrdersModel/OrdStatus.model";
import { UpcomingOrdModel } from '../../Models/OrdersModel/UpcOrder.model';

/*** Services ***/ 
import { OrdersService } from '../../Services/OrdService.service';

/*** Ngx Spinner ***/ 
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-upcomingorders',
  templateUrl: './upcomingOrders.component.html',
  styleUrls: ['./upcomingOrders.component.scss']
})
export class UpcomingOrdersComponent implements OnInit {

  public ordersStatus: any;
  public orederDetail$: Observable<any>;
  public upcOrderModel = new UpcomingOrdModel();  

  constructor( private route: ActivatedRoute, private spinner: NgxSpinnerService, private orderService: OrdersService ) { 
    this.spinner.show(); }

  ngOnInit(): void { 
    /// get data from route resolver
    this.route.data.subscribe(res=>{
      this.ordersStatus = new OrdersStatus;
      this.ordersStatus = res;      
      setTimeout(() => { this.spinner.hide();  }, 2000);
    },
    error=>{
      setTimeout(() => { this.spinner.hide();  }, 1000);
      console.log(error);
    })   

  }

}
