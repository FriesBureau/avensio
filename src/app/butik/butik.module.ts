import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../butik/shared/shared.module';
import { ButikRoutingModule } from './butik-routing.module';

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

// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component';
import { BlogComponent } from './widgets/blog/blog.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { InstagramComponent } from './widgets/instagram/instagram.component';
import { ServicesComponent } from './widgets/services/services.component';
import { CollectionComponent } from './widgets/collection/collection.component';

@NgModule({
  declarations: [
    FashionOneComponent,
    FashionTwoComponent,
    FashionThreeComponent,
    VegetableComponent,
    WatchComponent,
    FurnitureComponent,
    FlowerComponent,
    BeautyComponent,
    ElektronikComponent,
    PetsComponent,
    GymComponent,
    ToolsComponent,
    ShoesComponent,
    BagsComponent,
    MarijuanaComponent,
    // Widgest Components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    InstagramComponent,
    ServicesComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    ButikRoutingModule,
    SharedModule
  ]
})
export class ButikModule { }
