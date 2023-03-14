import { Component , OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map } from 'rxjs';

// Shared
import { UserService } from 'ng-mlidynamics-mf/shared/data-access-user';

@Component({
  selector: 'ng-mlidynamics-mf-profile-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})

export class RemoteEntryComponent {
  public profile$ = this.oktaStateService.authState$.pipe(
    filter(state => !!state && !!state.isAuthenticated),
    map(state => state.idToken?.claims)
  );

  public date$ = this.oktaStateService.authState$.pipe(
    filter(state => !!state && !!state.isAuthenticated),
    map(state => (state.idToken?.claims.auth_time as number) * 1000),
    map(epochTime => new Date(epochTime)),
  );

  constructor(private oktaStateService: OktaAuthStateService) { }
}
