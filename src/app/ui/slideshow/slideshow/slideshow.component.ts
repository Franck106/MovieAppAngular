import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChildren, QueryList, Inject, PLATFORM_ID, ApplicationRef, ChangeDetectorRef, AfterContentInit, OnDestroy } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { first, filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-slideshow',
  template: `
    <p>
      slideshow works!
    </p>
  `,
  styleUrls: ['./slideshow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent implements AfterContentInit, OnDestroy {

  /**Delay between each automatic move */
  @Input() delay: 5000;
  /**Speed for one move */
  @Input() speed: 1000;
  /**Slides list */
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;
  /**Total of slides */
  total = 0;
  /**Currently displayed slide */
  current = 1;
  /**Transform value to move the slide */
  transform = '';
  /**Reference to the current timer */
  private timer = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
      private appRef: ApplicationRef,
      private changeDetector: ChangeDetectorRef,
  ) { }

  ngAfterContentInit(): void {
    if(this.slides) {
      this.total = this.slides.length;
      this.appRef.isStable.pipe(
        first(),
        filter(() => isPlatformBrowser(this.platformId)),
      ).subscribe(() => {
        /**Launches a new timer then move */
        this.timer = window.setTimeout(() =>{
          this.move();
          this.changeDetector.detectChanges();
        },this.delay);
      });
    }
  }

  /**Move to another slide
   * @param next Position of the destination slide
   */
  move(next = this.getNextPosition()): void {
    /*Translate the slides container */
    this.transform = `translateX(${(1-next) * 100}%)`;
    /*Update the new current position*/
    this.current = next;
    /*the transition event (registered in constructor) will relaunch a new timer */
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  /**Calculate next position
   * @returns Next position
   */
  private getNextPosition(): number {
    return (this.current < this.total) ? (this.current+1) : 1;
  }


}
