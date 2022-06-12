import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { AssetDetailsComponent } from '../../components/asset-details/asset-details.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AssetDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [CurrencyPipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssetDetailsComponent
  ]
})
export class SharedModule { }
