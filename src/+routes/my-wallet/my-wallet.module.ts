import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWalletComponent } from './my-wallet.component';
import { AssetRoutingModule } from './my-wallet-routing.module';
import { SharedModule } from '../../lib/shared/shared.module';


@NgModule({
  declarations: [
    MyWalletComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    SharedModule
  ]
})
export class MyWalletModule { }
