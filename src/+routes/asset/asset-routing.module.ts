import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetHistoryResolver } from './asset-history-resolver';
import { AssetResolver } from './asset-resolver';
import { AssetComponent } from './asset.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/'
  },
  {
    path: ':assetID',
    resolve: {
      asset: AssetResolver,
      assetHistory: AssetHistoryResolver
    },
    component: AssetComponent
  }       
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
