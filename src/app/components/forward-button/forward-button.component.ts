import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';

const Vivus = require('vivus');

/** INTERFACE 
 * 
 * DISPLAYS:
 * 
 * - A button that points forward.
 * 
 * 
 */

@Component({
  selector: 'app-forward-button',
  templateUrl: './forward-button.component.html',
  styleUrls: ['./forward-button.component.scss'],
})
export class ForwardButtonComponent implements OnInit, AfterViewInit {

  @ViewChild("forwardButtonTarget")
  forwardButtonTarget

  forward_button_svg_url: string = "/assets/svg/drawing_forward_button.svg";

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    new Vivus(this.forwardButtonTarget.nativeElement, {file: this.forward_button_svg_url, duration: 100, type: 'oneByOne', start: 'autostart' }, (res)=> {
      console.log(res);
    })
  }

}
