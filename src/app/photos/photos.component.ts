import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo/photo.service';
import { Photo } from '../models/photo.interface';

declare var $: any;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  openMenu: boolean = false;
  listPhotos: Photo[] = null;

  constructor(private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
    this.animateIntro();
    this.photoService.getPhotos().subscribe(
      observer => this.listPhotos = observer
    );
  }

  animateIntro() {
    setTimeout(function () {
      $('.bloc-camera').animate({ left: '-100vw' }, 800, 'easeInCubic', function () {
        $('.left-start, .slide-show').animate({ left: '0vw' }, 800, 'easeInCubic', null);
      })
    }, 1000);

  }

  toggleMenu() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      $('.left-start, .slide-show').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
    }
    else {
      $('.left-start, .slide-show').animate({ top: '-220vh' }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
    }
  }
  link(route: string) {
    var router = this.router;

    if ($(window).width() > 576) {

      $('.slide-show').animate({ top: '-100vh' }, 1500, 'easeOutQuart', null);
      $('.navigation').animate({ top: '-200vh' }, 1500, 'easeOutCubic', function () {
        $('.slide-show').animate({ left: '-100vw' }, 800, 'easeInCubic', function () {
          router.navigateByUrl(route);
        });
      });



    }
    else if ($(window).width() <= 576) {
      $('.container-fluid').slideUp(function () {
        router.navigateByUrl(route);
      });
    }
  }

}
