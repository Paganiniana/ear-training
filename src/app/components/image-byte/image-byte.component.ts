import { Component, OnInit, OnChanges, Input, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';

const Vivus = require('vivus');

/** INTERFACE
 * 
 * Expects:
 *  - url of an image // SVG PATH DRAWING
 *  - selectable
 *  - selected
 * 
 * Display:
 *  - renders differently depending on 
 *    - is selectable
 *    - is selected
 */

@Component({
  selector: 'app-image-byte',
  templateUrl: './image-byte.component.html',
  styleUrls: ['./image-byte.component.scss'],
})
export class ImageByteComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  image_url: String;

  @Input()
  selectable: Boolean;

  @Input()
  selected: Boolean;
  @ViewChild('selectedTarget')
  selectedTarget;
  selectedAnimation;
  selected_url = "/assets/svg/drawing_circled_rectangle.svg";

  @Input()
  redX;
  @ViewChild('redXTarget')
  redXTarget;
  redXAnimation;
  redx_url = "/assets/svg/red_x.svg";

  @Input()
  checkMark;
  @ViewChild('checkMarkTarget')
  checkMarkTarget;
  checkMarkAnimation;
  checkmark_url = "/assets/svg/checkmark.svg";

  @ViewChild('imageTarget')
  imageTarget;
  imageAnimation;

  constructor() { }

  ngOnInit() {
    
  }

  addX() {
    console.log("Add x");
    this.redXAnimation.play();
  }

  removeX() {
    console.log("Remove x");
    this.redXAnimation.reset();
  }

  addCheck() {
    console.log("Add check");
    this.checkMarkAnimation.play();
  }  

  removeCheck() {
    console.log("Remove x");
    this.checkMarkAnimation.reset();
  }

  addSelected() {
    console.log(this.selectedAnimation);
    this.selectedAnimation.play();
  } 

  removeSelected() {
    this.selectedAnimation.reset();
  }


  ngOnChanges(e) {
    console.log(e);
    if (e.hasOwnProperty('selected')) {
      if (e.selected.previousValue == true && e.selected.currentValue == false) {
        this.removeSelected();
      } else if (e.selected.previousValue == false && e.selected.currentValue == true) {
        this.addSelected();
      }
    } else if (e.hasOwnProperty('redX')) {
      if (e.redX.previousValue == true && e.redX.currentValue == false) {
        this.removeX();
      } else if (e.redX.currentValue == true) {
        this.addX();
      }
    } else if (e.hasOwnProperty('checkMark')) {
      if (e.checkMark.previousValue == true && e.checkMark.currentValue == false) {
        this.removeCheck();
      } else if (e.checkMark.currentValue == true) {
        this.addCheck();
      }
    }
  }

  ngAfterViewInit() {
    this.imageAnimation = new Vivus(this.imageTarget.nativeElement, {
      file: this.image_url, 
      duration: 100, 
      type: 'oneByOne', 
      start: 'autostart'
    });

    // create other animations, but don't activate them
    this.checkMarkAnimation = new Vivus(this.checkMarkTarget.nativeElement, {
      file: this.checkmark_url,
      duration: 50,
      type: 'oneByOne',
      start: 'manual'
    });

    this.redXAnimation = new Vivus(this.redXTarget.nativeElement, {
      file: this.redx_url,
      duration: 50,
      type: 'oneByOne',
      start: 'manual'
    });

    this.selectedAnimation = new Vivus(this.selectedTarget.nativeElement, {
      file: this.selected_url,
      duration: 50,
      type: 'oneByOne',
      start: 'manual'
    });
  }

}
