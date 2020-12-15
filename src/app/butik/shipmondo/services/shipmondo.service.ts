import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Servicepoint } from '../models/servicepoint.model';
import { Quotes } from '../models/quotes.model';
import { Salesorder } from '../models/salesorder.model';

import {HttpClient, HttpHeaders, HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map, filter, switchMap, reduce } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';


 

@Injectable({
  providedIn: 'root'
})
export class ShipmondoService {


  private pickup_points = 'https://app.shipmondo.com/api/public/v3/pickup_points?carrier_code=gls';

  private quotes = 'https://app.shipmondo.com/api/public/v3/quotes';

  private salesorder = 'https://app.shipmondo.com/api/public/v3/sales_orders';

  private salesorder_create_shipment = 'https://app.shipmondo.com/api/public/v3/sales_orders/3150645/create_shipment'; // indsæt  {id}/create_shipment

  private imported_shipments = 'https://app.shipmondo.com/api/public/v3/imported_shipments';

  private package_types = 'https://app.shipmondo.com/api/public/v3/package_types';

  private authorizationdata = 'Basic ' + btoa('5cb79ea3-54b3-40af-a7dd-3f8f7f8c0b67:4b890a42-5b3c-4b15-a0ce-c162fd8ecc39');

 
 

   pickup_pointsParams = new HttpParams()

 //.set('content', this.createNewForm.controls['content'].value);
.set('countrycode', 'DK')
 .set('zipcode', '3230')
// .set('zipcode', this.forsendelseForm.controls.postalcode.value)
.set('city', 'Esrum')
.set('address', 'Ålykkevej 6')
// .set('address', this.forsendelseForm.controls.address.value)
// .set('quantity', '50')
;

quotesParams = new HttpParams()

//.set('content', this.createNewForm.controls['content'].value);
.set('product_code', 'GLSDK_SD')
.set('service_codes', 'EMAIL_NT,SMS_NT')
// .set('zipcode', this.forsendelseForm.controls.postalcode.value)
.set('city', 'Esrum')
.set('address', 'Ålykkevej 6')
//.set('address', this.forsendelseForm.controls.address.value)
// .set('quantity', '50')
;
 
 
httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
'Authorization': 'Basic ' + btoa('5cb79ea3-54b3-40af-a7dd-3f8f7f8c0b67:4b890a42-5b3c-4b15-a0ce-c162fd8ecc39')
//    'Authorization': 'Basic ' + btoa('username:password')
  }),
    //withCredentials: true,
//    params: this.pickup_pointsParams,
 
    /*
    params: new HttpParams({
      fromString:  'address=%C3%85lykkevej%206' 
    }) */
  };

 

 


  constructor(
    private http: HttpClient) { }

       /** GET pickup points from the API server */
       getServicePoints (address,zipcode): Observable<Servicepoint[]> {
        console.log('Data sendt ',address, zipcode);
       let pickup_pointsParams = new HttpParams()
       .set('countrycode', 'DK')
        .set('zipcode', zipcode)
        //  .set('city', 'by')
      .set('address', address)
        .set('quantity', '20');

      let pickuphttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': this.authorizationdata
//        'Authorization': 'Basic ' + btoa('5cb79ea3-54b3-40af-a7dd-3f8f7f8c0b67:4b890a42-5b3c-4b15-a0ce-c162fd8ecc39')
    //    'Authorization': 'Basic ' + btoa('username:password')
      }),
        //withCredentials: true,
        params: pickup_pointsParams,
      };
    
        return this.http.get<Servicepoint[]>(this.pickup_points,  pickuphttpOptions)
        .pipe(
          retry(0),
          catchError(this.handleError)
        )
      }

         /** GET quotes from the API server */
         getQuotes(senderaddress, senderzipcode, receiveraddress, receiverzipcode): Observable<Quotes[]> {

        
          let quotes_Params = new HttpParams()

          .set('product_code', 'GLSDK_SD')
         .set('service_codes', 'EMAIL_NT,SMS_NT')

           let quotes_httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json',
            'Authorization': this.authorizationdata
          }),
            //withCredentials: true,
            params: quotes_Params,
          };
          const body = { 'sender':  {
            'address1': senderaddress,
            'zipcode': senderzipcode,
         //   'city': sendercity,
            'country_code': 'DK'
          },
          'receiver': {
            'address1': receiveraddress,
            'zipcode': receiverzipcode,
         //   'city': 'Odense NØ',
            'country_code': 'DK'
          },
          'parcels': [{
            'weight': 1000
          }]
          }
          return this.http.post<Quotes[]>(this.quotes, 
            body,quotes_httpOptions)
          .pipe(
            retry(0),
            catchError(this.handleError)
          )
        }

        createShipmondoServiceOrder(
          // order
          order_id,
          ordercreated,
          // ship_to
          shippingname,
          shippingaddress,
          shippingzipcode,
          shippingcity,
          shippingemail,
          shippingphone,

          // service_point
          servicepointname,
          servicepointaddress,
          servicepointzipcode,
          servicepointcity,
          servicepointid,
          
          // bill_to
          invoicename,
          invoiceaddress,
          invoicezipcode,
          invoicecity,
          invoiceemail,
          invoicephone,
          
          // amount and tax
          authorized_amount,
          amount_excluding_vat, 
          vat_amount,
          orderline,
          //shipping

          ): Observable<Salesorder[]> {
           let salesorder_httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json',
            'Authorization': this.authorizationdata
          }),
            //withCredentials: true,
          };
          const body = {
            "order_id": order_id,
            "ordered_at": ordercreated, 
//            "ordered_at": "2018-10-17T15:25:44.557+02:00", 
            "source_name": "Fries Bureau",
            "order_note": "Note",
            "archived": false,
            "shipment_template_id": "162663", // Find skabelon ID https://app.shipmondo.com/main/app/#/shipment-template
            "packing_slip_format": null,
            "ship_to": {
              "name": shippingname,
              "attention": null,
              "address1": shippingaddress,
              "address2": null,
              "zipcode": shippingzipcode,
              "city": shippingcity,
              "country_code": "DK",
              "email": shippingemail,
              "mobile": shippingphone,
              "telephone": shippingphone,
              "instruction": null
            },
            "bill_to": {
              "name": invoicename, 
              "attention": null,
              "address1": invoiceaddress,
              "address2": null,
              "zipcode": invoicezipcode,
              "city": invoicecity,
              "country_code": "DK",
              "email": invoiceemail,
              "mobile": invoicephone,
              "telephone": invoicephone
            },
            "payment_details": {
              "amount_excluding_vat": amount_excluding_vat,
              "amount_including_vat": authorized_amount,
              "authorized_amount": authorized_amount,
              "currency_code": "DKK",
              "vat_amount": vat_amount,
              "vat_percent": "0.25",
              "payment_method": "Stripe",
              "transaction_id": order_id,
              "payment_gateway_id": "1938" // Er måske Shipmondos interne ID system for betalingsløsninger
            },
            "service_point": {
              "id": servicepointid,
              "name": servicepointname,
              "address1": servicepointaddress,
              "address2": null,
              "zipcode": servicepointzipcode,
              "city": servicepointcity,
              "country_code": "DK"
            },
            "order_lines": 
           
            orderline
            //shipping
             /* [
              {
                "line_type": "item",
                "item_name": "T-Shirt",
                "item_sku": "TS001-WH",
                "item_variant_code": "White",
                "quantity": "1.0",
                "unit_price_excluding_vat": "4000.0",
                "discount_amount_excluding_vat": "0.0",
                "vat_percent": "0.25",
                "currency_code": "DKK"
              }
            ]*/
          }
          return this.http.post<Salesorder[]>(this.salesorder, 
            body,salesorder_httpOptions)
          .pipe(
            retry(0),
            catchError(this.handleError)
          )
        }


          /** POST create shipment based on shipmondo service order ID */
          createShipmondoShipment(): Observable<Salesorder>{

  

            let salesorder_httpOptions = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json',
              'Authorization': this.authorizationdata
            }),
              //withCredentials: true,
            };
            const body = {
              "order_id": 'pi_1H0TreEIhPBZpG1VlU18FSGj-1',
              "ordered_at": "2018-10-17T15:25:44.557+02:00",
              "source_name": "Fries Bureau ApS",
              "order_note": "Note",
              "archived": false,
              "shipment_template_id": "162663", // Find skabelon ID https://app.shipmondo.com/main/app/#/shipment-template
              "packing_slip_format": null,
              "ship_to": {
                "name": "Carsten Fries",
                "attention": null,
                "address1": "Ålykkevej 6",
                "address2": null,
                "zipcode": "5000",
                "city": "Odense C",
                "country_code": "DK",
                "email": "lene@email.dk",
                "mobile": "12345678",
                "telephone": "12345678",
                "instruction": null
              },
              "bill_to": {
                "name": "Fries Bureau",
                "attention": "Carsten Fries",
                "address1": "Ålykkevej 6",
                "address2": null,
                "zipcode": "3230",
                "city": "Græsted",
                "country_code": "DK",
                "email": "kontakt@friesbureau.dk",
                "mobile": "70400407",
                "telephone": "70400407"
              },
              "payment_details": {
                "amount_excluding_vat": "4000.0",
                "amount_including_vat": "5000.0",
                "authorized_amount": '4343',
                "currency_code": "DKK",
                "vat_amount": "1000.0",
                "vat_percent": "0.25",
                "payment_method": "stripe",
                "transaction_id": "123456789",
                "payment_gateway_id": "4012"
              },
              "service_point": {
                "id": "95558",
                "name": "Påskeløkkens Købmand",
                "address1": "Paaskeløkkevej 11",
                "address2": null,
                "zipcode": "5000",
                "city": "Odense C",
                "country_code": "DK"
              },
              "order_lines": [
                {
                  "line_type": "item",
                  "item_name": "T-Shirt",
                  "item_sku": "TS001-WH",
                  "item_variant_code": "White",
                  "quantity": "1.0",
                  "unit_price_excluding_vat": "4000.0",
                  "discount_amount_excluding_vat": "0.0",
                  "vat_percent": "0.25",
                  "currency_code": "DKK"
                }
              ]
            }


// return this.http.post(this.salesorder_create_shipment + '/' + serviceorderID + '/create_shipment',  this.httpOptions)
return this.http.post<Salesorder>(this.salesorder_create_shipment,body, salesorder_httpOptions) 
.pipe(
          retry(0),
          catchError(this.handleError)
        )
      }

       // Handle API errors
 handleError(error: HttpErrorResponse) {
   
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};


 


}
