import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { BookingService } from '../services/booking/booking.service';
import { BookingToServer } from '../models/bookingToServer.interface';
import { Dates } from '../utils/dates';

declare var $: any;

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

  @Input() month_parameter: any = 0;
  @Input() year_parameter: any = 0;

  public listDays;
  public listDaysPrevMonth: number[];
  public listDaysNextMonth: number[];
  public _month: number;
  public list_months: string[];
  public _year: number;
  public _date: Date;
  public _count_date_clic: number;
  d_start: string;
  d_end: string;
  public openMenu: boolean;
  public isBook: boolean[];
  public observeListDays$;

  constructor(private router: Router, private bookingService: BookingService) {
    this.listDays = [];
    this.listDaysPrevMonth = [];
    this.listDaysNextMonth = [];
    this._month = 0;
    this.list_months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    this._year = 0;
    this._date = new Date();
    this._count_date_clic = 0;
    this.openMenu = false;
    this.d_start = '';
    this.d_end = '';
    this.isBook = [];
  }

  ngOnInit() {
    this.beforInitMonth();
    this.getDate();
  }

  beforInitMonth() {
    if (this.month_parameter != 0)
      this._date.setMonth(Dates.RE_FORMAT_MONTH(this.month_parameter) - 1);
    else this._date.setMonth(this._date.getMonth());
  }

  getDate() {
    this._month = this._date.getMonth();
    if (this.year_parameter != 0) this._year = this.year_parameter;
    else this._year = this._date.getFullYear();
    this.getDaysInMonth(this._month, this._year);
  }

  getDaysInMonth(month, year) {

    this.initListDaysPrevMonth(year, month);
    let number_days_month = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= number_days_month; i++) {
      this.listDays.push(i);
    }
    this.initListDaysNextMonth(year, month);
    this.surveyListDaysComplete();
  }

  surveyListDaysComplete() {
    this.observeListDays$ = new Observable<Array<number>>(observer => {
      for (let n of this.listDays) {
        observer.next(n);
      }
      observer.complete()
    })
      .subscribe(
        () => { },
        (err) => console.log(err),
        () => this.getInfosDays()
      );
  }

  getInfosDays() {
    this.isBook = [];
    this.bookingService.daysDetailFree(this.listDays, this._month, this._year)
      .subscribe(

        data => {
          for (let i = 0; i < data.length; i++) {

            if (data[i] == "ON") this.isBook.push(false);
            else this.isBook.push(true);
          }
        }
      );
  }


  initMonth(type: string) {
    if (type == '++') this._date.setMonth(this._date.getMonth() + 1);
    else if (type == '--') this._date.setMonth(this._date.getMonth() - 1);
    this.listDays = [];
    this.listDaysPrevMonth = [];
    this.listDaysNextMonth = [];
    this.getDate();
  }

  initListDaysPrevMonth(year, month) {
    let first_day = new Date(year, month, 1).getDay();
    let last_day_of_last_month = new Date(year, month, 0).getDate();
    let temp_list: number[] = [];
    for (let i = 1; i < first_day; i++) {
      temp_list.push(last_day_of_last_month--);
    }
    this.listDaysPrevMonth = temp_list.reverse();
  }

  initListDaysNextMonth(year, month) {
    let last_day = new Date(year, month + 1, 0).getDay();
    //Last day until sunday
    let first_day_next_month = 1;
    for (let i = last_day + 1; i <= 7; i++) {

      this.listDaysNextMonth.push(first_day_next_month);
      first_day_next_month++;
    }
  }


  getDayClicked(day, type) {

    if (type != true) {

      day = Dates.FORMAT_DAY(day.toString());
      let month = Dates.FORMAT_MONTH((this._month + 1).toString());

      if (this._count_date_clic == 0)
        this.d_start = day + '/' + month + '/' + this._year;
      else this.d_end = day + '/' + month + '/' + this._year;
      this.initCountClic();
    }
  }

  initCountClic() {
    if (this._count_date_clic == 0) this._count_date_clic = 1;
    else this._count_date_clic = 0;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;

    if (this.openMenu) {
      $('.container-calendar, .date-select').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: 0 }, 1000, 'easeOutCubic', function () { });
    }
    else {
      $('.container-calendar, .date-select').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
      $('.navigation').animate({ top: '-100vh' }, 1000, 'easeOutCubic', function () { });
    }

  }

  validDate(event) {
    event.stopPropagation();
    var router = this.router;

    if (!this.getDayInDate()) alert('La date de départ ne peut être inférieure à la date d\'arrivée!');
    else {
      this.initBookingService();

      $('.container-fluid').slideUp(1000, function () {
        router.navigateByUrl('/booking');
      });
    }
  }

  getDayInDate() {

    let d_s = this.d_start.split('/');
    let d_e = this.d_end.split('/');

    let d_A = new Date(parseInt(d_s[2]), parseInt(d_s[1]), parseInt(d_s[0]));
    let d_B = new Date(parseInt(d_e[2]), parseInt(d_e[1]), parseInt(d_e[0]));
    return d_A < d_B;
  }

  private initBookingService() {
    let d_s_split = this.d_start.split('/');
    let d_e_split = this.d_end.split('/');
    let list_dates = this.getDatesBetweenToDates(
      new Date(parseInt(d_s_split[2]), parseInt(d_s_split[1]) - 1, parseInt(d_s_split[0])),
      new Date(parseInt(d_e_split[2]), parseInt(d_e_split[1]) - 1, parseInt(d_e_split[0]))
    );
    let bookings: BookingToServer[] = [];
    for (let i = 0; i < list_dates.length - 1; i++) {
      let booking: BookingToServer = { id: 0, date: '', price: 0, type: '' };
      let date_format_fr: string = list_dates[i].getDate() + '/' + (list_dates[i].getMonth() + 1) + '/' + list_dates[i].getFullYear();

      booking.date = date_format_fr;
      booking.price = 0;
      booking.type = '';

      bookings.push(booking);
    }
    this.bookingService.setBookingList(bookings);
  }

  private getDatesBetweenToDates(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
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
}
