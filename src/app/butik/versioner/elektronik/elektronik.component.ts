import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../butik/shared/classes/product';
import { ProductService } from '../../../butik/shared/services/product.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-elektronik',
  templateUrl: './elektronik.component.html',
  styleUrls: ['./elektronik.component.scss']
})
export class ElektronikComponent implements OnInit, OnDestroy {
  
  public themeLogo: string = 'assets/images/icon/logo-10.png'; // Change Logo

  public products: Product[] = [];
  public products2: Product[] = [];
  public productCollections: any[] = [];

  constructor(
    public productService: ProductService,
    private title: Title, 
    private meta: Meta) {
 
 /*
    
      this.productService.getProducts2()
      .subscribe((response: any) => {
        this.products2 = response;
         console.log('products2',this.products2);
      }, err => {
        console.log(err);
      });
 */

    this.productService.getProducts2().subscribe((response: any) => {
      //  this.products2 = response;
    this.products2 = response.filter(item => item.type == 'elektronik');

      // Set meta tags
      this.title.setTitle('Avensio - Demo webbutik - Elektronik');
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
        { name: 'twitter:site', content: 'https://avensio.friesbureau.dk/butik/elektronik' },
        { name: 'twitter:image', content: 'https://avensio.friesbureau.dk/assets/images/product/elektronik/3.jpg' },
    
        { property: 'og:url', content: 'https://avensio.friesbureau.dk/butik/elektronik' },
        { property: 'og:title', content: 'Avensio - Demo webbutik - Elektronik' },
        { property: 'og:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
        { property: 'og:image', content: 'https://avensio.friesbureau.dk/assets/images/product/elektronik/3.jpg'  },
        { property: 'og:type', content: 'product'},
        { property: 'og:locale', content: 'da_DK'},
    
        {name: 'title', content:  'Avensio - Demo webbutik - Elektronik' },
        {name: 'description', content:  'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling'},
        {name: 'robots', content: 'index, follow'}
      ]); 
      // Get Product Collection 
      this.products2.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/electronics/1.jpg',
    save: '10% rabat',
    title: 'højtaler'
  }, {
    image: 'assets/images/collection/electronics/2.jpg',
    save: '20% rabat',
    title: 'øretlf.'
  },
  {
    image: 'assets/images/collection/electronics/3.jpg',
    save: '15% rabat',
    title: 'bedste køb'
  }]

  data = {
    titel: 'Fries.. Dit udviklende og kreative digitale bureau. Find din digitale identitet !',
    beskrivelse: 'Forside beskrivelse',
    billede: '../../../assets/svg.logo.svg'
  };
  

  ngOnInit() {
 
    

    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#6d7e87');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }

  
  
 

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
