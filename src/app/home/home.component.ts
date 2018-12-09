import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Jquery for map's div easing effect 
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slide: string = '';

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  closeRightDiv() {
    if ($(window).width() > 576) {
      $('.map').animate({ left: $('.map').width() - ($('.map').width() + $('.map').width() + 15) }, 1100, 'easeOutBounce', function () {
        $('.map').css({ 'display': 'none' });
        $('.menu').css({ 'display': 'block' });
        $('.menu').animate({ top: '0vh' });
      });
    }
    else if ($(window).width() <= 576) {
      $('.map').animate({ top: $('.map').height() - ($('.map').height() + $('.map').height()) }, 1100, 'easeOutBounce', function () {
        $('.map').css({ 'display': 'none' });
        $('.menu').css({ 'display': 'block' });
        $('.menu').animate({ top: '0vh' });
      });
    }
  }

  link(route: string) {
    var router = this.router;

    if ($(window).width() > 576) {
      $('.menu').animate({ left: $('.map').width() - ($('.map').width() + $('.map').width() + 25) }, 1100, 'easeOutCubic', function () {
        $('.container-fluid').slideUp(function () {
          router.navigateByUrl(route);
        });
      });

    }
    else if ($(window).width() <= 576) {
      $('.menu').animate({ top: $('.map').height() - ($('.map').height() * 3.4) }, 1100, 'easeOutCubic', function () {
        $('.container-fluid').slideUp(function () {
          router.navigateByUrl(route);
        });
      });
    }
  }

}
