import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CinemaComponent } from './cinema.component';

const routes: Routes = [{ path: '', component: CinemaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoutingModule { }
