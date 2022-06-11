import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetResolver } from './asset-resolver';
import { AssetComponent } from './asset.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/'
  },
  {
    path: ':assetID',
    resolve: {
      assets: AssetResolver
    },
    component: AssetComponent
  }       
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
