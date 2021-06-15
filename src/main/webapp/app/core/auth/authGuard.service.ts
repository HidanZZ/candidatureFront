import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { StateStorageService } from './state-storage.service';
import { Authority } from 'app/config/authority.constants';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private accountService: AccountService, private stateStorageService: StateStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          // eslint-disable-next-line no-console
          console.log(account);
          if (this.accountService.hasAnyAuthority(Authority.CANDIDAT)) {
            // eslint-disable-next-line no-console

            this.router.navigate(['/candidat']);
            return false;
          } else if (this.accountService.hasAnyAuthority(Authority.ECOLE)) {
            // eslint-disable-next-line no-console

            this.router.navigate(['/ecole']);
            return false;
          } else if (this.accountService.hasAnyAuthority(Authority.RESPONSABLE)) {
            // eslint-disable-next-line no-console

            this.router.navigate(['/responsable']);
            return false;
          } else if (this.accountService.hasAnyAuthority(Authority.ADMIN)) {
            // eslint-disable-next-line no-console

            this.router.navigate(['/admin/dashboard']);
            return false;
          }

          this.router.navigate(['accessdenied']);
          return false;
        }

        return true;
      })
    );
  }
}
