import { Component, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router, Scroll, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, translate: TranslateService,
    private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('da');
      translate.addLangs(['da','en', 'fr']);
    };
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){

        console.log('Sidetracking ',event.urlAfterRedirects);
        gtag('config', 'UA-141784093-4', {'page_path': event.urlAfterRedirects});
      }
    })
  }

}
