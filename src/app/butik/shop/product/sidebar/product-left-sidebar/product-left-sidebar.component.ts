import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SeoService } from "../../../../shared/services/seo.service";
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { Title, Meta } from '@angular/platform-browser';
import { TagsSeo } from '../../../../shared/models/tags-seo.model';
import { filter, map } from 'rxjs/operators';



@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0; 
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  public uniqColor = []

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  data = {
    titel: 'Avensio.. Dit udviklende og kreative digitale bureau. Find din digitale identitet !',
    beskrivelse: 'Avensio Vi udvikler din digitale virkelighed. Visuel identitet i video og billeder. Digital marketing, kommunikation og strategi. Webudvikling, websites og webbutik. Og virksomheds- eller politisk fortælling.',
    billede: ''
  };


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public seoservice: SeoService,
    public title: Title,
    public meta: Meta) { 



//   this.route.data.subscribe(response => this.product = response.data );

   this.activatedRoute.params.subscribe(params => {
    this.productService.getProductBySlug2(params.slug)
    .subscribe((response: any) => {
      this.product = response;  
      console.log('response produktside',response);    
      this.title.setTitle(this.product.title); 
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary' },
         { name: 'twitter:site', content: 'https://friesbureau.dk' },
        { name: 'twitter:image', content: this.product.images[0].src },
      
        { property: 'og:url', content: 'https://friesbureau.dk' },
        { property: 'og:title', content: this.product.title},
         { property: 'og:image', content: this.product.images[0].src },
        { property: 'og:type', content: 'product'},
        { property: 'og:locale', content: 'da_DK'},
      
        {name: 'title', content:  this.product.title },
        {name: 'description', content:  this.product.description },
         {name: 'robots', content: 'index, follow'}
      ]);
    }, err => {
      console.log(err);
    });
	 
	});

/*
      this.productService.getProductBySlug2(this.route.snapshot.params.slug)
      .subscribe((response: any) => {
        this.product = response;  
        console.log('response produktside',response);    
        this.title.setTitle(this.product.title); 
        this.meta.addTags([
          { name: 'twitter:card', content: 'summary' },
           { name: 'twitter:site', content: 'https://friesbureau.dk' },
          { name: 'twitter:image', content: this.product.images[0].src },
        
          { property: 'og:url', content: 'https://friesbureau.dk' },
          { property: 'og:title', content: this.product.title},
           { property: 'og:image', content: this.product.images[0].src },
          { property: 'og:type', content: 'product'},
          { property: 'og:locale', content: 'da_DK'},
        
          {name: 'title', content:  this.product.title },
          {name: 'description', content:  this.product.description },
           {name: 'robots', content: 'index, follow'}
        ]);
      }, err => {
        console.log(err);
      });
 
      */
 
     
/*
      this.productService.getProductBySlug(this.route.snapshot.params.slug)
      .subscribe((response: Product) => {
        
        
        console.log('tjek af this.produkt',response) 
        if(response) {
        this.title.setTitle(response.title);
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary' },
         { name: 'twitter:site', content: 'https://friesbureau.dk' },
        { name: 'twitter:image', content: this.data.billede },
      
        { property: 'og:url', content: 'https://friesbureau.dk' },
        { property: 'og:title', content: 'test titel'},
         { property: 'og:image', content: this.data.billede },
        { property: 'og:type', content: 'product'},
        { property: 'og:locale', content: 'da_DK'},
      
        {name: 'title', content:  'test titel' },
         {name: 'robots', content: 'index, follow'}
      ]);
    }
      else {
         console.log('Ingen meta tags');
        }
        this.product = response;   
      }, err => {
        console.log(err);
      });

      */

    /*
      this.productService.getProductbyID(this.route.snapshot.params.slug)
      .subscribe((response: any) => {
        this.product = response;
        console.log('title',this.product.title,'this.product',this.product,);
      }, err => {
        console.log(err);
      });*/

      /*
      this.productService.getProductBySlug(this.route.snapshot.params.slug)
      .subscribe((response: any) => {
        this.product = response;   
      }, err => {
        console.log(err);
      });
      */
        // this.get(id);

 
 

//  this.productService.getProductbyID(this.route.snapshot.params.slug)
 

 
           
    }
 

    public ngOnInit(): void { 

  
      

  


       // this.get(id);
    
 
       
   
//   this.loadProduct();

//    this.setMetaTags(); 
  }


  loadProduct() {
    /*
  this.productService.getProductBySlug(this.route.snapshot.params.slug)
        .subscribe((response: any) => {
          this.product = response;       
        }, err => {
          console.log(err);
        });
             */
      }
 
  // Get Product Color
 
  Color(variants) {

    /*
    let i = 0;
    for (const key of Object.keys(variants)) {


      this.uniqColor.push(variants[key].color);
      i++;
      if (i === Object.keys(variants).length) 
      return this.uniqColor;
      break;
      
    }

    return false; */
    
    const uniqColor = []
     for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor;
  } 

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
     }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

 
 
}
