import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    ButtonToggleComponent,
    DataGridComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonToggleComponent,
    DataGridComponent,
    CardComponent
  ]
})
export class StarwarsUiKitsModule { }
