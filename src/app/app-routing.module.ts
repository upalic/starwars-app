import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarwarsListComponent } from './starwars-list/starwars-list.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./starwars-list/starwars-list.module').then(m => m.StarwarsListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
