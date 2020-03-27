import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Slide } from '../models/slide';

@Component({
  selector: 'app-slide',
  template: `
    <div>
      <a [routerLink]="slide.link">
        <picture>
          <source [srcset]="slide.imgSrcFull" media="(min-width: 960px)">
          <source [srcset]="slide.imgSrc" media="(max-width: 959px)">
          <img [src]="slide.imgSrcFull" alt="slide.imgAlt">
        </picture>
      </a>
    </div>
  `,
  styleUrls: ['./slide.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideComponent {

  @Input() slide: Readonly<Slide>;

}
