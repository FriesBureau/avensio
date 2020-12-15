import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FashionOneComponent } from './versioner/fashion/fashion-one/fashion-one.component';
import { FashionTwoComponent } from './versioner/fashion/fashion-two/fashion-two.component';
import { FashionThreeComponent } from './versioner/fashion/fashion-three/fashion-three.component';
import { VegetableComponent } from './versioner/vegetable/vegetable.component';
import { WatchComponent } from './versioner/watch/watch.component';
import { FurnitureComponent } from './versioner/furniture/furniture.component';
import { FlowerComponent } from './versioner/flower/flower.component';
import { BeautyComponent } from './versioner/beauty/beauty.component';
import { ElektronikComponent } from './versioner/elektronik/elektronik.component';
import { PetsComponent } from './versioner/pets/pets.component';
import { GymComponent } from './versioner/gym/gym.component';
import { ToolsComponent } from './tools/tools.component';
import { ShoesComponent } from './versioner/shoes/shoes.component';
import { BagsComponent } from './versioner/bags/bags.component';
import { MarijuanaComponent } from './versioner/marijuana/marijuana.component';

const routes: Routes = [
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
    path: 'vegetable',
    component: VegetableComponent
  },
  {
    path: 'watch',
    component: WatchComponent
  },
  {
    path: 'furniture',
    component: FurnitureComponent
  },
  {
    path: 'flower',
    component: FlowerComponent
  },
  {
    path: 'beauty',
    component: BeautyComponent
  },
  {
    path: 'elektronik',
    component: ElektronikComponent
  },
  {
    path: 'pets',
    component: PetsComponent
  },
  {
    path: 'gym',
    component: GymComponent
  },
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'shoes',
    component: ShoesComponent
  },
  {
    path: 'bags',
    component: BagsComponent
  },
  {
    path: 'marijuana',
    component: MarijuanaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButikRoutingModule { }
