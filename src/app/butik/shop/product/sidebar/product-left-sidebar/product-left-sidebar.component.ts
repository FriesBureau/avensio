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

        // this.get(id);

  // this.route.data.subscribe(response => this.product = response.data );

  

  this.productService.getProductBySlug(this.route.snapshot.params.slug)
        .subscribe((response: any) => {
          this.product = response;

           /*
          this.title.setTitle('test');
          this.meta.addTags([
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:description', content: this.data.beskrivelse },
            { name: 'twitter:site', content: 'https://friesbureau.dk' },
            { name: 'twitter:image', content: this.data.billede },
        
            { property: 'og:url', content: 'https://friesbureau.dk' },
            { property: 'og:title', content: this.data.titel },
            { property: 'og:description', content: this.data.beskrivelse },
            { property: 'og:image', content: this.data.billede },
            { property: 'og:type', content: 'product'},
            { property: 'og:locale', content: 'da_DK'},
        
            {name: 'title', content:  this.data.titel },
            {name: 'description', content:  this.data.beskrivelse },
            {name: 'robots', content: 'index, follow'}
          ]);
          

          const seo: TagsSeo = {
            title: this.product.title, 
            description: this.product.title,
            image: '',
            url: '',
          };
          this.seoservice.setSeo(seo); */
       
        }, err => {
          console.log(err);
        });

  
    }
 

    public ngOnInit(): void { 
   
//   this.loadProduct();

//    this.setMetaTags(); 
  }


  loadProduct() {
  this.productService.getProductBySlug(this.route.snapshot.params.slug)
        .subscribe((response: any) => {
          this.product = response;

          
 
          const seo: TagsSeo = {
            title: this.product.title, 
            description: this.product.title,
            image: '',
            url: '',
          };
          this.seoservice.setSeo(seo);
       
        }, err => {
          console.log(err);
        });
      }
  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
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


async setMetaTags() {
    const productstatus = await this.product;

    if(productstatus) {
    const seo: TagsSeo = {
      title: `Titel`,
      description: 'Beskrivelse',
      image: 'https://friesbureau.dk',
      url: '',
    };
    this.seoservice.setSeo(seo); 
  }
    }


  timeout() {
    setTimeout(() =>  {
      this.title.setTitle('Produkt Titel');
      this.meta.updateTag({name: 'description', content:'TheRightDoctors  Dr.S Ramakrishnan After discharge of a STEMI patient… story continues'});   
    }, 
      5000);
    }
 
}
