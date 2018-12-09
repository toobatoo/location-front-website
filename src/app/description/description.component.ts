import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  openMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.animateIntro();
  }

  animateIntro() {
    setTimeout(function () {
      if ($(window).width() > 576) {
        $('.info-icon').animate({
          right: $(window).width() - ($(window).width() * 2)
        }, 1000, 'easeOutCubic', function () {
        });
        $('.left-start').animate({
          left: '0'
        }, 1000, 'easeOutCubic', function () {
        });
      }
    }, 1000);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      $('.left-start').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
    }
    else {
      $('.left-start').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
    }
  }

  link(route: string) {
    var router = this.router;

    if ($(window).width() > 576) {
      $('.left-start').animate({ top: '-200vh' }, 1500, 'easeOutCubic', function () {
        router.navigateByUrl(route);
      });
      $('.navigation').animate({ top: '-200vh' }, 1500, 'easeOutCubic', function () { });

    }
    else if ($(window).width() <= 576) {
      $('.container-fluid').slideUp(function () {
        router.navigateByUrl(route);
      });
    }
  }
}
