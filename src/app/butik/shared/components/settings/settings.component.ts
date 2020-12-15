import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = []
  
  public languages = [{ 
    name: 'Dansk',
    code: 'da'
  }, 
  { 
    name: 'English',
    code: 'en'
  }, 
  {
    name: 'French',
    code: 'fr'
  }];

  public currencies = [{
    name: 'Kroner',
    currency: 'DKK',
    price: 1.00 // price of euro
  },{
    name: 'Euro',
    currency: 'EUR',
    price: 7.45 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 6.5 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
