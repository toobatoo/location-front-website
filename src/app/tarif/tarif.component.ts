import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarifService } from '../services/tarif/tarif.service';
import { Tarif } from '../models/Tarif.interface';

declare var $: any;

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.css']
})
export class TarifComponent implements OnInit {
  openMenu: boolean = false;
  listTarifs: Tarif[] = [];
  listMonths: string[];
  year: number;

  constructor(private router: Router, private tarifService: TarifService) {
    this.listMonths = ['MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE'];
  }

  ngOnInit() {

    this.tarifService.getPricesAndMonths().subscribe(
      (observer) => {
        this.listTarifs = observer;
        this.year = observer[0].year;
      }
    );
    this.animateIntro();
  }

  animateIntro() {
    $('.left-start, .app-card').animate({ right: '0vw' }, 800, 'easeInCubic', null);
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      $('.left-start, .app-card').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
    }
    else {
      $('.left-start, .app-card').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
    }
  }
  link(route: string) {
    var router = this.router;

    if ($(window).width() > 576) {

      $('.app-card').animate({ top: '-100vh' }, 1500, 'easeOutQuart', null);
      $('.navigation').animate({ top: '-200vh' }, 1500, 'easeOutCubic', function () {
        $('.app-card').animate({ left: '-100vw' }, 800, 'easeInCubic', function () {
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

  goDisponibilites(month) {
    var router = this.router;
    var year = this.year;

    $('.left-start, .app-card').animate({ left: '-100vw' }, 800, 'easeInCubic', function () {
      router.navigateByUrl('disponibilites/' + month + '/' + year);
    });
  }
}
