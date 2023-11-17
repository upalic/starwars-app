import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarwarsListComponent } from './starwars-list.component';
import { StarwarsListRoutingModule } from './starwars-list-routing.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { StarwarsUiKitsModule } from '../starwars-ui-kits/starwars-ui-kits.module';
import { HttpClientModule } from '@angular/common/http';
import { TypographyModule } from '@progress/kendo-angular-typography';
import { StarwarsService } from '../service/starwars.service';

@NgModule({
  declarations: [
    StarwarsListComponent
  ],
  imports: [
    CommonModule,
    StarwarsListRoutingModule,
    LayoutModule,
    TypographyModule,
    StarwarsUiKitsModule,
    HttpClientModule
  ],
  providers: [ StarwarsService ]
})
export class StarwarsListModule { }
