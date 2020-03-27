import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SlideComponent } from './ui/slideshow/slideshow/slide/slide.component';
import { SlideshowComponent } from './ui/slideshow/slideshow/slideshow.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideComponent,
    SlideshowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SlideComponent, SlideshowComponent]
})
export class AppModule { }
