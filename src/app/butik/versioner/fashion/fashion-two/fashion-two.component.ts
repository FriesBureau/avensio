import { Component, OnInit } from '@angular/core';
import { HomeSlider } from '../../../../butik/shared/data/slider';
import { Product } from '../../../../butik/shared/classes/product';
import { ProductService } from '../../../../butik/shared/services/product.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-fashion-two',
  templateUrl: './fashion-two.component.html',
  styleUrls: ['./fashion-two.component.scss']
})
export class FashionTwoComponent implements OnInit {
  
  public themeLogo: string = 'assets/images/icon/logo-5.png'; // Change Logo

  public products : Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService,
    private title: Title, 
    private meta: Meta) {
    this.productService.getProducts2().subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');

      this.title.setTitle('Avensio - Demo webbutik - Fashion - Model 2');
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
        { name: 'twitter:site', content: 'https://avensio.friesbureau.dk/butik/fashion-2' },
        { name: 'twitter:image', content: 'https://avensio.friesbureau.dk/assets/images/product/fashion/18.jpg' },
    
        { property: 'og:url', content: 'https://avensio.friesbureau.dk/butik/fashion-2' },
        { property: 'og:title', content: 'Avensio - Demo webbutik - Fashion - Model 2' },
        { property: 'og:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
        { property: 'og:image', content: 'https://avensio.friesbureau.dk/assets/images/product/fashion/18.jpg'  },
        { property: 'og:type', content: 'product'},
        { property: 'og:locale', content: 'da_DK'},
    
        {name: 'title', content:  'Avensio - Demo webbutik - Fashion - Model 2' },
        {name: 'description', content:  'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling'},
        {name: 'robots', content: 'index, follow'}
      ]); 
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public HomeSliderConfig: any = HomeSlider;

  public sliders = [{
    title: 'welcome to fashion',
    subTitle: 'Men fashion',
    image: 'assets/images/slider/3.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Women fashion',
    image: 'assets/images/slider/4.jpg'
  }]

  // Collection banner
  public collections1 = [{
    image: 'assets/images/collection/fashion/3.jpg',
    save: 'save 30%',
    title: 'Women'
  }, {
    image: 'assets/images/collection/fashion/4.jpg',
    save: 'save 50%',
    title: 'Watch'
  }];

  public collections2 = [{
    image: 'assets/images/collection/fashion/5.jpg',
    save: 'save 30%',
    title: 'Sandle'
  }, {
    image: 'assets/images/collection/fashion/6.jpg',
    save: 'save 10%',
    title: 'Kids'
  }];

  ngOnInit(): void {
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
