import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../../butik/shared/data/slider';
import { Product } from '../../../../butik/shared/classes/product';
import { ProductService } from '../../../../butik/shared/services/product.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];
  
  constructor(public productService: ProductService,
    private title: Title, 
    private meta: Meta) {
    this.productService.getProducts2().subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');

       // Set meta tags
       this.title.setTitle('Avensio - Demo webbutik - Fashion');
       this.meta.addTags([
         { name: 'twitter:card', content: 'summary' },
         { name: 'twitter:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
         { name: 'twitter:site', content: 'https://avensio.friesbureau.dk/butik/fashion' },
         { name: 'twitter:image', content: 'https://avensio.friesbureau.dk/assets/images/product/fashion/3.jpg' },
     
         { property: 'og:url', content: 'https://avensio.friesbureau.dk/butik/fashion' },
         { property: 'og:title', content: 'Avensio - Demo webbutik - Fashion' },
         { property: 'og:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
         { property: 'og:image', content: 'https://avensio.friesbureau.dk/assets/images/product/fashion/3.jpg'  },
         { property: 'og:type', content: 'product'},
         { property: 'og:locale', content: 'da_DK'},
     
         {name: 'title', content:  'Avensio - Demo webbutik - Fashion' },
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

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'welcome to fashion',
    subTitle: 'Men fashion',
    image: 'assets/images/slider/1.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Women fashion',
    image: 'assets/images/slider/2.jpg'
  }]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
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
