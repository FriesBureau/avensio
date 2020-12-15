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
  public productCollections: any[] = [];

  constructor(
    public productService: ProductService,
    private title: Title, 
    private meta: Meta) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'elektronik');
      // Get Product Collection
      this.products.filter((item) => {
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
    beskrivelse: 'Vi udvikler din digitale virkelighed. Visuel identitet i video og billeder. Digital marketing, kommunikation og strategi. Webudvikling, websites og webbutik. Og virksomheds- eller politisk fortælling.',
    billede: '../../../assets/svg.logo.svg'
  };
  

  ngOnInit() {
    this.title.setTitle(this.data.titel);
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
