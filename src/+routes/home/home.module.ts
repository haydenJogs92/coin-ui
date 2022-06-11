import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AssetDetailsComponent } from '../../components/asset-details/asset-details.component';



@NgModule({
  declarations: [
    HomeComponent,
    AssetDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
