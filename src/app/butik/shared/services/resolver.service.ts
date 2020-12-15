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



 

  /* Resolver */

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {

      this.productService.getProductBySlug(route.params.slug).subscribe(product => {

  
 
          this.product = product;
         
    }) 
    return this.product;
  }  
}
