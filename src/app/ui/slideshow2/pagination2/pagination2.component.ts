import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-pagination2',
  template: `
    <mat-slider min="1" [max]="total" [value]="current" (change)="onChange($event)"></mat-slider>
  `,
  styleUrls: ['./pagination2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pagination2Component {

  @Input() total: number;
  @Input() current: number;
  @Output() pagination = new EventEmitter<number>();
  
  constructor() { }

  onChange(event: MatSliderChange): void {
    this.pagination.emit(event.value || 1);
  }

}
