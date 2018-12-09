import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.css']
})
export class DisponibiliteComponent implements OnInit {

  month_parameter: any = 0;
  year_parameter: any = 0;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.month_parameter = this._route.snapshot.params['month'];
    this.year_parameter = this._route.snapshot.params['year'];
    this.animateIntro();
  }

  animateIntro() {
    $('.calendar').animate({ right: '0vw' }, 800, 'easeInCubic', null);
  }

}
