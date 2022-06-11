import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeResolver } from './home-resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      assets: HomeResolver
    },
    component: HomeComponent
  }       
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
