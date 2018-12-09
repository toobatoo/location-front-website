import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { DayComponent } from './day/day.component';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';
import { BookingComponent } from './booking/booking.component';
import { MapComponent } from './map/map.component';
import { DescriptionComponent } from './description/description.component';
import { CardComponent } from './card/card.component';
import { TarifComponent } from './tarif/tarif.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendrierComponent,
    DayComponent,
    DisponibiliteComponent,
    BookingComponent,
    MapComponent,
    DescriptionComponent,
    CardComponent,
    TarifComponent,
    PhotosComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATwVboVqZVsCDrHDzoRRVZqqcV-OhwqMA'
    }),
    AgmDirectionModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
