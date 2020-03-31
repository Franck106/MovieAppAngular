import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { Pagination2Component } from './pagination2/pagination2.component';
import { Slideshow2Component } from './slideshow2/slideshow2.component';
import { Slide2Component } from './slideshow2/slide2/slide2.component';



@NgModule({
  declarations: [Pagination2Component, Slideshow2Component, Slide2Component],
  imports: [
    CommonModule, RouterModule, MatSliderModule
  ],
  exports: [Pagination2Component, Slideshow2Component, Slide2Component]
})
export class Slideshow2Module {}
