import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';

import { ShipmondoService } from "../../../shipmondo/services/shipmondo.service";

import { Observable, of } from 'rxjs';
 import { Servicepoint } from "../../../shipmondo/models/servicepoint.model";
 import { Quotes } from "../../../shipmondo/models/quotes.model";
 import { Salesorder } from "../../../shipmondo/models/salesorder.model";


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = {};
  servicepoint: Servicepoint[];
  salesorder: Salesorder;
  selectedServicePoint: any = 'Vælg afhentningssted';
  quotes: Quotes;

  constructor(public productService: ProductService,
    private orderService: OrderService,
    public shipmondoservice: ShipmondoService) { }

  ngOnInit(): void {	


    this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
  }

test(){
  this.productService.removeCartItems();
}

  ngAfterViewInit() {
  this.productService.removeCartItems();
  }

}
