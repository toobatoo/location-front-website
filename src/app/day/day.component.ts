import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() day: number;
  @Input() forbidden: boolean;

  @Output() day_click = new EventEmitter();

  constructor() {
    this.day = 0;
    //this.forbidden = false;
  }

  ngOnInit() {
  }

  clicDay(day: string) {
    this.day_click.emit(day);
  }
}
