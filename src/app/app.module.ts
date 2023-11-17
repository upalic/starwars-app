import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypographyModule } from '@progress/kendo-angular-typography';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TypographyModule,
    RippleModule,
    IndicatorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
