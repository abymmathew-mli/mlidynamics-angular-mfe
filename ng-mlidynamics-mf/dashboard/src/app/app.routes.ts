import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

// Okta specific
import { OktaCallbackComponent } from '@okta/okta-angular';

import { loadRemoteModule } from '@nrwl/angular/mf';

export const appRoutes: Route[] = [
  /* 
  {
    path: 'login',
    loadChildren: () => import('login/Module').then((m) => m.RemoteEntryModule),
  }, 
  */
  // remote loading
  {
    path: 'profile',
    loadChildren: () => loadRemoteModule('profile', './Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
