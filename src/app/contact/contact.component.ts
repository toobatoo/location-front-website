import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact/contact.service';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  openMenu: boolean = false;
  mailValid: boolean = false;
  hideErrorMail: boolean = true;

  constructor(private router: Router, private contactService: ContactService) { }

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
      $('.left-start').animate({}, 1500, 'easeOutCubic', function () {
        router.navigateByUrl(route);
      });
      $('.navigation').animate({ top: '-100vh' }, 1500, 'easeOutCubic', function () { });

    }
    else if ($(window).width() <= 576) {
      $('.container-fluid').slideUp(function () {
        router.navigateByUrl(route);
      });
    }
  }

  submit(nom, prenom, mail, msg) {
    this.hideErrorMail = this.validateEmail(mail.value);
    if (this.isValid(nom.value, prenom.value, mail.value, msg.value)) {
      this.contactService.sendMail(nom.value, prenom.value, mail.value, msg.value).subscribe(
        observer => console.log(observer)
      );
    }
  }

  private validateEmail(mail) {
    var reg = /\S+@\S+\.\S+/;
    return reg.test(mail);
  }

  private isValid(nom, prenom, mail, msg) {
    if (nom != '' && prenom != '' && mail != '' && this.validateEmail(mail) && msg != '')
      return true;
    else return false;
  }
}
