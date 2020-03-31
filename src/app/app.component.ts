import { Component } from '@angular/core';
import { Network } from '@ngx-pwa/offline';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <main>
        <h2>app-root works</h2>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {

  title = 'ProjectForTest';
  
  constructor( protected network: Network) {}
}
