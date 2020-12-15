import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import {HttpClient, HttpHeaders, HttpErrorResponse,HttpParams} from '@angular/common/http';
import {  ViewChild } from '@angular/core';
import {loadStripe} from '@stripe/stripe-js';
import { ShipmondoService } from "../../shipmondo/services/shipmondo.service";

import { Observable, of } from 'rxjs';
 import { Servicepoint } from "../../shipmondo/models/servicepoint.model";
 import { Quotes } from "../../shipmondo/models/quotes.model";
 import { Salesorder } from "../../shipmondo/models/salesorder.model";
 import { DatePipe } from '@angular/common'

 export interface Orderline {
  line_type : string;
  item_name: string;
  item_sku : string;
  item_variant_code: string;
  quantity : number,
  unit_price_excluding_vat: number;
  discount_amount_excluding_vat: number;
  vat_percent : number;
  currency_code : string;
}; 

@Component({
  selector: 'app-checkud',
  templateUrl: './checkud.component.html',
  styleUrls: ['./checkud.component.scss']
})

export class CheckudComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: Product[] = [];
  public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public shipping: string;
  public productamount:  any;
  public amount:  any;
  orderline: Orderline;
  
  servicepoint: Servicepoint[];
  salesorder: Salesorder;
  selectedServicePoint: any = 'Vælg afhentningssted';
  quotes: Quotes;
 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
  }; 
  



  
  constructor(private fb: FormBuilder,
     public productService: ProductService,
    private orderService: OrderService,
    private http: HttpClient,
    public shipmondoservice: ShipmondoService,
    public datepipe: DatePipe) { 
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      shipmondoname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      shipmondoemail: ['', [Validators.required, Validators.email]],
      shipmondoaddress: ['', [Validators.required, Validators.maxLength(50)]],
      shipmondozipcode: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      shipmondo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      shipmondotown: ['', Validators.required],
    //  country: ['', Validators.required],
      town: ['', Validators.required],
     // state: ['', Validators.required],
    //  postalcode: ['', Validators.required],
      zipcode: ['', Validators.required],
      myControlName: '',
    });
  }
 
  

  async ngOnInit(): Promise<void> {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(productamount => this.productamount  = productamount);
 



    /*
    const that = this;

    const stripe = await loadStripe('pk_test_51GtZPOEIhPBZpG1VtJ4nii3S9EZ08CMyk9VXbKLQ13UzdI3Ze4Rwd7P2fOMBBV0GfOHOESbk4mE1aQA3moj6IMqf00lXRsYkzp');
 
    // Purchase har jeg ikke benyttet, da jeg indtil videre ikke udregner total på serveren
    const purchase = {
      items: [{ id: "xl-tshirt" }]
    };
 
    const elements = stripe.elements();

 

 
    var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    const cardElement = elements.create('card', { style: style });
    cardElement.mount("#card-element");


    cardElement.on('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });

    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: 
        [{ id: this.products }],
        amount: this.amount * 100
      
    })
    })
    .then(res => {
  
      return res.json();
    })
    .then(data => {

    const form = document.getElementById('payment-form');
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked

      const billingname = that.checkoutForm.value.firstname + (' ') + that.checkoutForm.value.lastname;

 
      stripe.confirmCardPayment(data.clientSecret, {
        receipt_email: that.checkoutForm.value.email,
          payment_method: {
            card: cardElement,
            billing_details: {
              // Include any additional collected billing details.
              name: billingname,
              address: {
                postal_code: that.checkoutForm.value.zipcode,
              },
            },
            
          },
        })
        .then(function(result) {
          if (result.error) {
            // Show error to your customer
        alert('fejl')
          } else {
            // The payment succeeded!
    // alert(result.paymentIntent.id);
 that.goToOrder(result.paymentIntent.id);

          }
        })
    
    });

  });
  */
 
  }
 

 
   
  getServicePoints(){
    if(this.checkoutForm.value.shipmondozipcode != '') {
    this.shipmondoservice.getServicePoints(this.checkoutForm.value.shipmondoaddress,this.checkoutForm.value.shipmondozipcode)
  .subscribe((response: any) => {
    this.servicepoint = response;
    console.log('Servicepoint ',this.servicepoint);
  }, err => {
    console.log(err);
  });
} else {
  alert('Indtast modtagers postnummer for at se afhentningssteder')
}
  }
/*
  createServiceOrder(){
    this.shipmondoservice.createShipmondoServiceOrder('4898143', '2018-10-17T15:25:44.557+02:00','Forsendelsesnavn', 4.000, 4000, 1000)
  .subscribe((response: any) => {
    this.salesorder = response;
    console.log('Shipmondo Salesorder ',this.salesorder);
  }, err => {
    console.log(err);
  });
  }*/

  createShipment(){
    this.shipmondoservice.createShipmondoShipment()
    .subscribe((response: any) => {
      this.salesorder = response;
      console.log('Shipment ',this.salesorder);
    }, err => {
      console.log(err);
    });
    }

 

 
  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }


  onSelectedServicePoint(newValue) {
    console.log('Servicepoint er valgt ',newValue);
    this.selectedServicePoint = newValue; 
    this.shipmondoservice.getQuotes(this.checkoutForm.value.address,this.checkoutForm.value.zipcode,
      this.selectedServicePoint.address, this.selectedServicePoint.zipcode)
    .subscribe((response: any) => {
      this.quotes = response;
      this.calculatetotal(this.quotes.price);
      console.log('Leveringsdata ',this.quotes);
    }, err => {
      console.log(err);
    });
  }; 

async calculatetotal(shippingcost) {
  this.amount = +this.productamount + +shippingcost;
console.log('Total Amount ',this.amount);
this.processStripe(this.amount, shippingcost);
  return this.amount;
  }

  async processStripe(amount, shippingcost) {
    const stripe = await loadStripe('pk_test_51GtZPOEIhPBZpG1VtJ4nii3S9EZ08CMyk9VXbKLQ13UzdI3Ze4Rwd7P2fOMBBV0GfOHOESbk4mE1aQA3moj6IMqf00lXRsYkzp');
    const that = this;
    const elements = stripe.elements();
    var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    const cardElement = elements.create('card', { style: style });
    cardElement.mount("#card-element");

    cardElement.on('change', ({error}) => {
      const displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });

    fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: 
        [{ id: this.products }], // Jeg ved ikke hvordan man laver regnestykket i app.js og 
        // og hvordan man overfører produkter og priser til node serveren.
//        amount: amount * 100
amount: Math.round(amount * 100)
    })
    })
    .then(res => {
  
      return res.json();
    })
    .then(data => {

    const form = document.getElementById('payment-form');
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      // Complete payment when the submit button is clicked

    //  const billingname = that.checkoutForm.value.firstname + (' ') + that.checkoutForm.value.lastname;
 
      stripe.confirmCardPayment(data.clientSecret, {
        receipt_email: that.checkoutForm.value.email,
          payment_method: {
            card: cardElement,
            billing_details: {
              // Include any additional collected billing details.
              name: that.checkoutForm.value.name,
              address: {
                postal_code: that.checkoutForm.value.zipcode,
              },
            },
            
          },
        })
        .then(function(result) {
          if (result.error) {
            // Show error to your customer
        alert('Udfyld afsendernavn og afsenderpostnummer')
          } else {
            // The payment succeeded!ld
    // alert(result.paymentIntent.id);
 that.goToOrder(result.paymentIntent.id, result.paymentIntent.created, shippingcost);

          }
        })
    
    });

  });
  }
 
test() {
  
alert(localStorage.getItem("cartItems"));

// this.productService.removeCartItems();
// localStorage.removeItem("cartItems");
//localStorage.setItem("cartItems", JSON.stringify([]));


this.productService.removeCartItems();
// this.products = [];  denne er voldsom da den fjerner visning af alle produkter.
// localStorage.clear(); den går ikke da jeg skal lave orderitems. 
// sessionStorage.clear(); denne ved jeg ikke hvad laver.
// console.log('Er der flere produkter ? ',this.products)
alert('LocalStorage - CartItems ' + localStorage.getItem("cartItems"));


/*
const product = {
  "id": 121,
  "title": "elektronik 1",
  "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
  "type": "elektronik",
  "brand": "sony",
  "collection": [
    "bedste køb"
  ],
  "category": "elektronik",
  "price": 335,
  "sale": false,
  "discount": 10,
  "stock": 20,
  "new": false,
  "tags": [
    "sony"
  ],
  "variants": [
    {
      "variant_id": 12101,
      "id": 121,
      "sku": "sony19",
      "image_id": 12111
    }
  ],
  "images": [
    {
      "image_id": 12111,
      "id": 121,
      "alt": "elektronik",
      "src": "assets/images/product/elektronik/1.jpg",
      "variant_id": [
        12101
      ]
    }
  ],
  "quantity": 5
}

localStorage.setItem("cartItems", JSON.stringify(product));

alert(localStorage.getItem("cartItems"));

*/
/*
this.productService.removeCartItem(product);
*/

// this.productService.calculateStockCounts("cartItems",0);
// localStorage.setItem("cartItems", JSON.stringify([{"id":122,"title":"elektronik 2","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.","type":"elektronik","brand":"panasonic","collection":["bedste køb","på udsalg"],"category":"elektronik","price":285,"sale":true,"discount":"24","stock":15,"new":true,"tags":["panasonic","new"],"variants":[{"variant_id":12201,"id":122,"sku":"sony19","image_id":12211}],"images":[{"image_id":12211,"id":122,"alt":"elektronik","src":"assets/images/product/elektronik/2.jpg","variant_id":[12201]}],"quantity":0}]));

 
/* 
  const loop = this.products.map(function(produkt) { 
  const produktdiscount = 100 - produkt.discount;
    const unitprice = produkt.price / 100 / 1.25;
    const discountamount = produkt.price - (produkt.price * produktdiscount / 100); 
    console.log('Unitprice ',unitprice);
    console.log('Produkt Price ',produkt.price);
    console.log('Discountamount ',discountamount);

    const orderlinejson = {
      "line_type": "item",
      "item_name": produkt.title,
      "item_sku": produkt.id,
      "item_variant_code": produkt.type,
      "quantity": produkt.quantity,
      "unit_price_excluding_vat": unitprice,
      "discount_amount_excluding_vat": discountamount / 1.25,
      "vat_percent": "0.25",
      "currency_code": "DKK"
    
    }
    return orderlinejson;
  
  }); */
/*
  const orderline = loop.push(
    {
      "line_type": "item",
      "item_name": "Forsendelse",
      "item_sku": 33434343,
      "item_variant_code": "Forsendelse",
      "quantity": 1,
      "unit_price_excluding_vat": 43 / 1.25,
      "discount_amount_excluding_vat": 0,
      "vat_percent": "0.25",
      "currency_code": "DKK"
    
    }
  ); 
//  console.log('Produkter ',orderline.push(shipping));
// console.log('Produkter ',orderline);
console.log('Loop ',loop);
 
*/

/* Virker - men skal udskiftes med map
this.products.forEach(function(produkt) { 
  const orderlinejson = {
    "line_type": "",
    "item_name": "",
    "item_sku": produkt.id,
    "item_variant_code": "",
    "quantity": produkt.quantity,
    "unit_price_excluding_vat": produkt.price / 0.25,
    "discount_amount_excluding_vat": "0.0",
    "vat_percent": "0.25",
    "currency_code": "DKK"
  
  }
console.log(orderlinejson);
}); */

 

/* Kode der virker
this.products.forEach(function(produkt) { 
  console.log(produkt.id); 
});
*/
  
 //  alert(this.products[0].quantity);


  /* 
  const stripedate = 1593769479 * 1000;
  const shipmondodate = '2020-07-03T11:14:05.724+02:00';
  const converted_timedate =this.datepipe.transform(1593769479000, 'yyyy-MM-dd');
  const product_amount_excl_tax = this.productamount / 1.25;
  const nydato = new Date(stripedate).toDateString();
  console.log('Converted ' + nydato);
  */
}

  
goToOrder(orderId, ordercreated, shippingcost)  {
//  this.shipmondoservice.createShipmondoServiceOrder(orderId);

const orderline = this.products.map(function(produkt) { 
  const produktdiscount = 100 - produkt.discount;
    const unitprice = produkt.price / 1.25;
    const discountamount = produkt.price - (produkt.price * produktdiscount / 100); 
    console.log('Unitprice ',unitprice);
    console.log('Produkt Price ',produkt.price);
    console.log('Discountamount ',discountamount);
  
    const orderlinejson = {
      "line_type": "item",
      "item_name": produkt.title,
      "item_sku": produkt.id,
      "item_variant_code": produkt.type,
      "quantity": produkt.quantity,
      "unit_price_excluding_vat": unitprice,
      "discount_amount_excluding_vat": discountamount / 1.25 * produkt.quantity,
      "vat_percent": "0.25",
      "currency_code": "DKK"
    }
    return orderlinejson;
  
  });
  console.log('Produkter ',orderline);

  orderline.push(
    {
      "line_type": "item",
      "item_name": "Forsendelse",
      "item_sku": 101,
      "item_variant_code": "Forsendelse",
      "quantity": 1,
      "unit_price_excluding_vat": shippingcost / 1.25,
      "discount_amount_excluding_vat": 0,
      "vat_percent": "0.25",
      "currency_code": "DKK"
    
    });

const ordredato = new Date(ordercreated * 1000);
const product_amount_excl_vat = this.productamount / 1.25;
const product_amount_vat = this.productamount * 0.25;
const amount_excl_vat = this.amount / 1.25;
const amount_vat = this.amount * 0.25;
// const invoicename =  this.checkoutForm.value.firstname + (' ') + this.checkoutForm.value.lastname;


 this.orderService.createOrder(this.products, orderline, this.checkoutForm.value, orderId, ordredato, this.quotes.price, this.amount);
 this.shipmondoservice.createShipmondoServiceOrder(
  // order 
   orderId, 
   ordredato,
   // ship_to
   this.checkoutForm.value.shipmondoname,
   this.checkoutForm.value.shipmondoaddress,
   this.checkoutForm.value.shipmondozipcode,
   this.checkoutForm.value.shipmondotown,
   this.checkoutForm.value.shipmondoemail,
   this.checkoutForm.value.shipmondophone,

   // service_point
   this.selectedServicePoint.name,
   this.selectedServicePoint.address,
   this.selectedServicePoint.zipcode,
   this.selectedServicePoint.city,
   this.selectedServicePoint.id,

   // bill_to
   this.checkoutForm.value.name,
   this.checkoutForm.value.address,
   this.checkoutForm.value.zipcode,
   this.checkoutForm.value.town,
   this.checkoutForm.value.phone,
   this.checkoutForm.value.email,


   // amount and tax
   this.amount, 
   amount_excl_vat, 
   amount_vat,

   // order_lines
   orderline
   )
 .subscribe((response: any) => {
   this.salesorder = response;
   console.log('Shipmondo Salesorder ',this.salesorder);
 }, err => {
   console.log(err);
 });

}
 

 
 
 


  // Stripe Payment Gateway

  /*
  stripeCheckout() {


    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'da',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
  
    this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Avensio',
      description: 'Webbutik',
      amount: this.amount * 100
    }) 
  }*/

 
 
 
}
