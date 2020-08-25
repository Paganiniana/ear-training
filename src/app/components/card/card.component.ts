import { Component, OnInit, Input } from '@angular/core';

/** INTERFACE  
 * 
 * DISPLAYS
 *  - Title
 *  - An image
 *  - Description
 *  - progress bar
 *  
 * 
 * EXPECTS
 *  - title (string)
 *  - image_url (string)
 *  - description (string)
 *  - progress (percentage, integer)
 * 
 * 
 */

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  image_url: string;

  @Input()
  percentage: number;


  constructor() { }


  ngOnInit() {}

}
