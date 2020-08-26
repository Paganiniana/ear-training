import { Component, OnInit, Input, AfterViewInit, ViewChild, AfterViewChecked } from '@angular/core';

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
export class ImageByteComponent implements OnInit, AfterViewInit {

  @Input()
  image_url: String;

  @Input()
  selectable: Boolean;

  @Input()
  selected: Boolean;

  @ViewChild('imageTarget')
  imageTarget;
  imageAnimation;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.imageAnimation = new Vivus(this.imageTarget.nativeElement, {
      file: this.image_url, 
      duration: 300, 
      type: 'oneByOne', 
      start: 'autostart'
    });
  }

}
