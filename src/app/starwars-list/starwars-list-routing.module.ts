import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StarwarsListComponent } from './starwars-list.component';

const routes: Routes = [
  {
    path: '',
    component: StarwarsListComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(routes),
    CommonModule
  ]
})
export class StarwarsListRoutingModule { }
