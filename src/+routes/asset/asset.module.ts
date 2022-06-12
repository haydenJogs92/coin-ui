import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { AssetRoutingModule } from './asset-routing.module';
import { SharedModule } from '../../lib/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AssetComponent],
  imports: [
    CommonModule,
    AssetRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class AssetModule { }
