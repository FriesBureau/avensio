import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Product } from '../classes/product';
import { ProductService } from './product.service';
import { SeoService } from "./seo.service";
import { Meta, Title } from '@angular/platform-browser';
import { TagsSeo } from '../models/tags-seo.model';


@Injectable({
	providedIn: 'root'
})
export class Resolver implements Resolve<Product> {
  
  public product: Product = {};

  constructor(
    private router: Router,
    public productService: ProductService,
    public seoservice: SeoService,
    public  title: Title,
  ) {}
 

/*
    resolve(route: ActivatedRouteSnapshot) {
    this.productService.getProductBySlug2(route.params.slug).subscribe(product => {
      if (!product) {  
        console.log('intet produkt i resolveren') 
      }  else {
      this.product = product;  
      console.log('produkt i resolveren') 
    }    
    })
    return this.product;
  }
  */

  /* Test Resolver 

  resolve(route: ActivatedRouteSnapshot){

      this.productService.getProductBySlug2(route.params.slug).subscribe(product => {
        this.product = product;
     }) 
    return this.product
  
  }  
*/
   /* Old Resolver */
   async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));    
    this.productService.getProductBySlug2(route.params.slug).subscribe(product => {
      if(!product) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
          this.product = product
      }
    })
    return this.product;
  }   
}
