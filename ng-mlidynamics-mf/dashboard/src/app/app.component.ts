import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

// Okta specific
import { filter, map, Observable, shareReplay } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

// Shared
import { UserService } from 'ng-mlidynamics-mf/shared/data-access-user';

@Component({
  selector: 'ng-mlidynamics-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  public isAuthenticated$: Observable<boolean> =
    this.oktaStateService.authState$.pipe(
      filter((authState) => !!authState),
      map((authState) => authState.isAuthenticated ?? false),
      shareReplay()
    );

  public name$: Observable<string> = this.oktaStateService.authState$.pipe(
    filter((authState) => !!authState && !!authState.isAuthenticated),
    map((authState) => authState.idToken?.claims.name ?? '')
  );

  constructor(
    private oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private userService: UserService,
    private router: Router
  ) { }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }
}
