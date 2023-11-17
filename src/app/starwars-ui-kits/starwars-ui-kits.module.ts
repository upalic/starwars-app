import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { CardComponent } from './card/card.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { TypographyModule } from '@progress/kendo-angular-typography';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

@NgModule({
 declarations: [
   ButtonToggleComponent,
   DataGridComponent,
   CardComponent
 ],
 imports: [
   CommonModule,
   GridModule,
   ButtonsModule,
   LayoutModule,
   RippleModule,
   TypographyModule,
   IndicatorsModule
 ],
 exports: [
   ButtonToggleComponent,
   DataGridComponent,
   CardComponent
 ]
})
export class StarwarsUiKitsModule { }