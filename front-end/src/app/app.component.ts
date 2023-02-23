import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->

    <div style="background-image: url('./assets/homepage.jpg') ; background-size: cover; background-position: center; background-repeat: no-repeat; height: 100vh; width: 100vw; background-attachment: fixed;"
        >
        <app-nav-bar/>

    <router-outlet />
      </div>
    
     `,
  styles: [],
})
export class AppComponent {
  title = 'bank-app';
}
