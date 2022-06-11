import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { AssetRoutingModule } from './asset-routing.module';

@NgModule({
  declarations: [AssetComponent],
  imports: [
    CommonModule,
    AssetRoutingModule
  ]
})
export class AssetModule { }
