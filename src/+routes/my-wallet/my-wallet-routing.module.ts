import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyWalletComponent } from './my-wallet.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/'
  },
  {
    path: ':userId',
    resolve: {
      // fetch my wallet details
      // asset: AssetResolver
    },
    component: MyWalletComponent
  }       
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
