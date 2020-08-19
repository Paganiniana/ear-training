import { Component, OnInit, Input } from '@angular/core';


/** INTERFACE
 * 
 * Expects:
 *  - url of an image
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
export class ImageByteComponent implements OnInit {

  @Input()
  image_url: String;

  @Input()
  selectable: Boolean;

  @Input()
  selected: Boolean;

  constructor() { }

  ngOnInit() {}

}
