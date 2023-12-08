import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElektronikComponent } from './versioner/elektronik/elektronik.component';
import { FashionOneComponent } from './versioner/fashion/fashion-one/fashion-one.component';
import { FashionTwoComponent } from './versioner/fashion/fashion-two/fashion-two.component';
import { FashionThreeComponent } from './versioner/fashion/fashion-three/fashion-three.component';

import { FurnitureComponent } from './versioner/furniture/furniture.component';

import { ToolsComponent } from './tools/tools.component';


const routes: Routes = [
  {
    path: 'elektronik',
    component: ElektronikComponent
  },
  {
    path: 'fashion',
    component: FashionOneComponent
  },
  {
    path: 'fashion-2',
    component: FashionTwoComponent
  },
  {
    path: 'fashion-3',
    component: FashionThreeComponent
  },
  {
    path: 'furniture',
    component: FurnitureComponent
  },
  {
    path: 'tools', 
    component: ToolsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButikRoutingModule { }
