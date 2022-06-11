import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('../+routes/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'asset',
        loadChildren: () => import('../+routes/asset/asset.module').then(m => m.AssetModule)
      }
    ]
  }       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
