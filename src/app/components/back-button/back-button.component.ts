import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

const Vivus = require('vivus');

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit, AfterViewInit {

  @ViewChild('backButtonTarget')
  backButtonTarget;

  back_button_svg_url:string ='/assets/svg/drawing_back_button.svg';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    new Vivus(this.backButtonTarget.nativeElement, {
      file: this.back_button_svg_url, 
      duration: 100, 
      type: 'oneByOne', 
      start: 'autostart'
    }, (res) => {
      console.log(res);
    })
  }

}
