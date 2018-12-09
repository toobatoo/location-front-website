import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() month: string = "";
  @Input() price: number = 0;
  @Input() value: string = "";
  @Output() emitPrice = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getPrice(price) {
    this.emitPrice.emit(price);
  }
}
