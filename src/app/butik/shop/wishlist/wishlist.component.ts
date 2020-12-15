import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../shared/services/product.service";
import { SeoService } from "../../shared/services/seo.service";
import { Product } from "../../shared/classes/product";
import { Title, Meta } from '@angular/platform-browser';
import { TagsSeo } from '../../shared/models/tags-seo.model';



@Component({
  selector: 'app-wishlist', 
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public products: Product[] = [];


  constructor(private router: Router, 
    public productService: ProductService,
    public seoservice: SeoService,
    private title: Title, 
    private meta: Meta) {
    this.productService.wishlistItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void { 
 
    

        const seo: TagsSeo = {
          title: `Titel`,
          description: 'Beskrivelse',
          image: 'https://friesbureau.dk',
          url: '',
        };
        this.seoservice.setSeo(seo); 

       
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if(status) {
      this.router.navigate(['/shop/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

}
