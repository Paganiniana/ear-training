import { Component, OnInit, Input } from '@angular/core';

/** INTERFACE
 * 
 * Expects:
 *  - text of selection
 *  - selected
 * 
 * Display:
 *  - renders differently depending on 
 *    - is note selected
 *    - is selected
 *  - ARIA notes:
 *    - should read as one selection of many
 *    - additional peramaters?
 */

@Component({
  selector: 'app-selectable-text-byte',
  templateUrl: './selectable-text-byte.component.html',
  styleUrls: ['./selectable-text-byte.component.scss'],
})
export class SelectableTextByteComponent implements OnInit {

  @Input()
  text: String;

  @Input()
  selected: Boolean;

  constructor() { }

  ngOnInit() {}

}
