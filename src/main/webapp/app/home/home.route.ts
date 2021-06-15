import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountService } from 'app/core/auth/account.service';
import { AuthGuardService } from 'app/core/auth/authGuard.service';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuardService],
  data: {
    pageTitle: 'Futur Uni!',
  },
};
