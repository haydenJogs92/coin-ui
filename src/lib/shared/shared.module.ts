import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { AssetDetailsComponent } from '../../components/asset-details/asset-details.component';
import { RouterModule } from '@angular/router';
import { UpdateWalletFormComponent } from 'src/components/update-wallet-form/update-wallet-form.component';

@NgModule({
  declarations: [
    AssetDetailsComponent,
    UpdateWalletFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssetDetailsComponent,
    UpdateWalletFormComponent
  ]
})
export class SharedModule { }
