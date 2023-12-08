import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSlider } from '../../../../butik/shared/data/slider';
import { Product } from '../../../../butik/shared/classes/product';
import { ProductService } from '../../../../butik/shared/services/product.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-fashion-three',
  templateUrl: './fashion-three.component.html',
  styleUrls: ['./fashion-three.component.scss']
})
export class FashionThreeComponent implements OnInit, OnDestroy {

  public products : Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService,
    private title: Title, 
    private meta: Meta)  {
    this.productService.getProducts2().subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');

      this.title.setTitle('Avensio - Demo webbutik - Fashion - Model 3');
      this.meta.addTags([
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
        { name: 'twitter:site', content: 'https://avensio.friesbureau.dk/butik/fashion-3' },
        { name: 'twitter:image', content: 'https://avensio.friesbureau.dk/assets/images/product/fashion/11.jpg' },
    
        { property: 'og:url', content: 'https://avensio.friesbureau.dk/butik/fashion-3' },
        { property: 'og:title', content: 'Avensio - Demo webbutik - Fashion - Model 3' },
        { property: 'og:description', content: 'Avensio - Er en Fries Bureau webbutik lavet med Angular 9 - Se mere om vores tilbud her: https://friesbureau.dk/udvikling' },
        { property: 'og:image', content: 'https://avensio.friesbureau.dk/assets/images/product/fashion/11.jpg'  },
        { property: 'og:type', content: 'product'},
        { property: 'og:locale', content: 'da_DK'},
    
        {name: 'title', content:  'Avensio - Demo webbutik - Fashion - Model 3' },
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
    image: 'assets/images/slider/5.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Women fashion',
    image: 'assets/images/slider/6.jpg'
  }];

  ngOnInit(): void {
    document.body.classList.add('box-layout-body');
  }

  ngOnDestroy() {
  	document.body.classList.remove('box-layout-body');
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
