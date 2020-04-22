import {
  Component,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  Input,
  Inject,
  PLATFORM_ID,
  ApplicationRef,
  ChangeDetectorRef,
  AfterContentInit,
  OnDestroy,
} from "@angular/core";
import { Slide2Component } from "./slide2/slide2.component";
import { first, filter } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-slideshow2",
  template: `
    <div id="slideshow">
      <div
        id="slides"
        (swipe)="onSwipe($event)"
        [style.transform]="transform"
        [style.transitionDuration.ms]="speed"
        (transitionend)="onTransitionEnd()"
      >
        <ng-content></ng-content>
      </div>
      <div id="pagination">
        <app-pagination2
          [current]="current"
          [total]="total"
          (pagination)="onPagination($event)"
        ></app-pagination2>
      </div>
    </div>
  `,
  styleUrls: ["./slideshow2.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Slideshow2Component implements AfterContentInit, OnDestroy {
  // tslint:disable-next-line: jsdoc-format
  /**Delay between each automatic move */
  @Input() delay = 5000;
  /**Speed for one move */
  @Input() speed = 1000;
  /**Slides list */
  @ContentChildren(Slide2Component) slides: QueryList<Slide2Component>;
  /**Total of slides */
  total = 0;
  /**Currently displayed slide */
  current = 1;
  /**Transform value to move the slide */
  transform = "";
  /**Reference to the current timer */
  private timer = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private appRef: ApplicationRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    if (this.slides) {
      this.total = this.slides.length;
      this.appRef.isStable
        .pipe(
          first(),
          filter(() => isPlatformBrowser(this.platformId))
        )
        .subscribe(() => {
          /**Launches a new timer then move */
          this.timer = window.setTimeout(() => {
            this.move();
            this.changeDetector.detectChanges();
          }, this.delay);
        });
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /**Move to another slide
   * @param next Position of the destination slide
   */
  move(next = this.getNextPosition()): void {
    /*Translate the slides container */
    this.transform = `translateX(${(1 - next) * 100}%)`;
    /*Update the new current position*/
    this.current = next;
    /*the transition event (registered in constructor) will relaunch a new timer */
  }

  start(): void {
    if (isPlatformBrowser(this.platformId)) {
      /*Stop any current timer to avoid concurrent timers */
      this.stop();
      /*Launches a new timer and then move*/
      this.timer = window.setTimeout(() => {
        this.move();
        this.changeDetector.markForCheck();
      }, this.delay);
    }
  }

  /**Stop the current timer */
  stop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.clearTimeout(this.timer);
    }
  }

  /** Transition listener handler */
  onTransitionEnd(): void {
    /* Relaunch a new timer */
    this.start();
  }

  /** Pagination listener handler */
  onPagination(page: number): void {
    /* Stop automatic delay as the user interacts */
    this.stop();
    /* Move to the wanted slide */
    this.move(page);
  }

  onSwipe(event: Event): void {
    /* Specific event type from Hammer are not inferred by Angular/TypeScript */
    const pointerEvent = (event as unknown) as PointerEventInput;
    switch (pointerEvent.direction) {
      case Hammer.DIRECTION_RIGHT:
        if (this.current > 1) {
          this.stop();
          this.move(this.current - 1);
        }
        break;
      case Hammer.DIRECTION_LEFT:
        if (this.current <= this.total) {
          this.stop();
          this.move();
        }
        break;
    }
  }

  /**Calculate next position
   * @returns Next position
   */
  private getNextPosition(): number {
    return this.current < this.total ? this.current + 1 : 1;
  }
}
