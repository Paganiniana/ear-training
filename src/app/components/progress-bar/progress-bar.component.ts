import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';

const Vivus = require("vivus");

/** INTERFACE:
 * 
 * Expects:
 *  - percent: integer (0-100)
 *  - orientation: boolean
 * 
 * Provides:
 *  - A visual display of how far along someone is on a certain something 
 *  - displays vertical on orientation true, horizontal on contrary.
 *  
 * 
 */

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, AfterViewInit {

  @Input()
  percentage: number;

  @ViewChild("progressBorderTarget")
  progressBorderTarget;
  progressBorderAnimation; // Vivus animation

  @ViewChild("progressFillerTarget")
  progressFillerTarget; 
  progressFillerAnimation;

  // svg urls
  progress_border_svg_url: string = "/assets/svg/drawing_progress_border_horizontal.svg";
  progress_filler_svg_url: string = "/assets/svg/drawing_progress_mask_horizontal.svg";

  // css for clip
  // TODO:
  //  - ditch the mask and, instead, create a custom vivus animation handler that
  //    simply doesn't display anything past the % mark.
  mask_width;

  constructor() { }

  ngOnInit() {
    this.mask_width = String(this.percentage) + "%";
  }

  ngAfterViewInit() {
    // create border
    this.progressBorderAnimation = new Vivus(this.progressBorderTarget.nativeElement, {
      file: this.progress_border_svg_url, 
      duration: 50, // the border shouldn't take as long to draw 
      type: 'oneByOne', 
      start: 'autostart'
    }, () => {
      // make sure the filler is drawn after the border
      // create filler
      this.progressFillerAnimation = new Vivus(this.progressFillerTarget.nativeElement, {
        file: this.progress_filler_svg_url, 
        duration: 100, 
        type: 'oneByOne', 
        start: 'autostart'
      });
    });
  }

}
