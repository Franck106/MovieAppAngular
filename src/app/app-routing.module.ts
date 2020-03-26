import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'cinema', loadChildren: () => import('./features/cinema/cinema.module').then(m => m.CinemaModule) },
  { path: '', redirectTo: 'cinema/movies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
