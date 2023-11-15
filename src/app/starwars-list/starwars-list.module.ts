import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarwarsListComponent } from './starwars-list.component';
import { StarwarsUiKitsModule } from '../starwars-ui-kits/starwars-ui-kits.module';

@NgModule({
  declarations: [
    StarwarsListComponent
  ],
  imports: [
    CommonModule,
    StarwarsUiKitsModule,
  ]
})
export class StarwarsListModule { }
