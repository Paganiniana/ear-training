import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

const Vivus = require('vivus');

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit, AfterViewInit {

  @Input()
  text;
  @Input()
  type;

  constructor() { }

  @ViewChild("titleBackgroundTarget")
  titleBackgroundTarget;

  titleBackgroundAnimation;

  // svg
  title_background_url: string = "/assets/svg/drawing_filled_in_rectangle.svg";

  ngOnInit() {}


  ngAfterViewInit() {
    console.log(this.titleBackgroundTarget);
    this.titleBackgroundAnimation = new Vivus(this.titleBackgroundTarget.nativeElement, {
      file: this.title_background_url, 
      duration: 50, // the border shouldn't take as long to draw 
      type: 'oneByOne', 
      start: 'autostart'
      }
    )
  }

}
