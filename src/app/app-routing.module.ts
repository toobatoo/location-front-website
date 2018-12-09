import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisponibiliteComponent } from './disponibilite/disponibilite.component';
import { BookingComponent } from './booking/booking.component';
import { MapComponent } from './map/map.component';
import { DescriptionComponent } from './description/description.component';
import { TarifComponent } from './tarif/tarif.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'disponibilites/:month/:year', component: DisponibiliteComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'map', component: MapComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'tarif', component: TarifComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
