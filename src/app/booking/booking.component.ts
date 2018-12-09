import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking/booking.service';
import { BookingToServer } from './../models/bookingToServer.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, map } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingList: BookingToServer[] = [];
  price: number = 0;
  checked: boolean = false;
  bookingForm: FormGroup;
  civilites: string[] = ['M.', 'Mme', 'Mlle'];

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookingService.getInfosDatesFromServer()
      //.pipe()
      .subscribe(
        data => { this.bookingList = data; console.log(data); }
      );

    this.createForm();
  }

  createForm() {
    this.bookingForm = this.formBuilder.group({
      civilite: '',
      name: '',
      firstname: '',
      mail: '',
      address: '',
      cp: '',
      phone: ''
    });
  }

  submit() {
    //Tests price > 0 && fields are not empties && mail format && one date is checked
    if (this.price > 0) {
      if (this.validateEmail()) {
        let dataNotEmpties = false;
        for (var key in this.bookingForm.value) {

          if (this.bookingForm.value[key] == '') dataNotEmpties = false;
          else dataNotEmpties = true;
        }
        if (dataNotEmpties == false) alert('Veuillez remplir tous les champs!');
        else {
          let list_dates = [];
          for (let i = 0; i < this.bookingList.length; i++) {
            if (this.bookingList[i].type != 'OFF') list_dates.push(this.bookingList[i].id);
          }
          this.bookingService.sendForm(this.bookingForm.value, list_dates).subscribe(
            observer => console.log(observer)
          );
        }
      }
      else alert('Format de mail invalide!');
    }
    else alert('Veuillez sélectionner une période disponible.');
  }

  private validateEmail() {
    var reg = /\S+@\S+\.\S+/;
    return reg.test(this.bookingForm.value.mail);
  }

  checkedAll() {
    this.price = 0;
    this.checked = !this.checked;

    if (this.checked) {
      for (let i = 0; i < this.bookingList.length; i++) {
        if (this.bookingList[i].type != 'OFF')
          this.price += Number(this.bookingList[i].price);
      }
    }
    else this.price = 0;
  }

  dateIsChecked(event, booking) {
    if (event.target.checked) {
      this.price += Number(booking.price);
    }
    else
      this.price -= Number(booking.price);
  }

}
