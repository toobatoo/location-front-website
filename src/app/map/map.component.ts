import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GeocodeService } from '../services/map/geocode.service';
import { Coords } from '../models/coords.interface';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  zoom: number = 18;
  mapTypeId: string = 'hybrid';
  iconMarker: string = 'http://localhost/rental-std/images/marker.png';
  map: any;
  location = { lat: 44.997762, lng: -1.201141 };
  loading: boolean;
  originCoords: Coords = { lat: 0, lng: 0 };
  destinationCoords: Coords = { lat: 0, lng: 0 };
  openMenu: boolean = false;
  renderOptions: any = {
    polylineOptions: { strokeColor: '#FFFFFF' }
  }
  originGeocode = '';
  destinationGeocode = '';

  constructor(private geocodeService: GeocodeService, private ref: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    this.animateIntro();
  }

  animateIntro() {
    $('.cover').animate({
      left: $(window).width()
    }, 2500, "easeOutCubic", () => {
      $('.cover').css('display', 'none');
    });
  }

  showLocation(form) {
    this.originGeocode = form.origin.value;
    this.destinationGeocode = form.destination.value;

    if (this.originGeocode == '') { this.originGeocode = 'Paris'; form.origin.value = 'Paris'; }
    if (this.destinationGeocode == '') {
      this.destinationGeocode = '19 résidence horizon marin, 33680 Lacanau';
      form.destination.value = this.destinationGeocode;
    }

    this.initDatasMap(0, 0, 0);

    this.geocodeService.geocodeAddress(this.originGeocode).pipe(
      tap((x) => console.log(x))
    )
      .subscribe(
        location => {
          this.originCoords = location;
          this.ref.detectChanges();
        }
      );

    this.geocodeService.geocodeAddress(this.destinationGeocode)
      .subscribe(
        location => {
          this.destinationCoords = location;
          this.ref.detectChanges();
        }
      );
  }

  showPlace() {
    this.initDatasMap(44.997762, -1.201141, 18);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      $('.navigation, .bloc-menu, .content-map, .bloc-bottom-left, .bloc-bottom-middle, .bloc-bottom-right').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
    }
    else {
      $('.navigation, .bloc-menu, .content-map, .bloc-bottom-left, .bloc-bottom-middle, .bloc-bottom-right').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
    }

  }

  link(route: string) {
    var router = this.router;

    if ($(window).width() > 576) {
      $('.container-fluid').slideUp(function () {
        router.navigateByUrl(route);
      });


    }
    else if ($(window).width() <= 576) {
      $('.container-fluid').slideUp(function () {
        router.navigateByUrl(route);
      });
    }
  }

  private initDatasMap(lat: number, lng: number, zoom: number) {
    this.location = { lat: lat, lng: lng };
    this.zoom = zoom;
  }
}
