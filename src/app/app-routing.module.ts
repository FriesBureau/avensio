import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './butik/shop/shop.component';
import { PagesComponent } from './butik/pages/pages.component';
import { ElementsComponent } from './butik/elements/elements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'butik/elektronik',
    pathMatch: 'full'
  },
  {
    path: 'butik',
    loadChildren: () => import('./butik/butik.module').then(m => m.ButikModule)
  },
  {
    path: 'shop',
    component: ShopComponent,
    loadChildren: () => import('./butik/shop/shop.module').then(m => m.StrukturModule)
  },
  { 
    path: 'pages',
    component: PagesComponent,
    loadChildren: () => import('./butik/pages/pages.module').then(m => m.PagesModule) 
  },
  { 
    path: 'elements', 
    component: ElementsComponent,
    loadChildren: () => import('./butik/elements/elements.module').then(m => m.ElementsModule) },
  {
    path: '**', // Navigate to Home Page if not found any page
    redirectTo: 'butik/elektronik',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
