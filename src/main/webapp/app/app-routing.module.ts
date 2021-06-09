import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SharedFiliereComponent } from 'app/shared-filiere/shared-filiere.component';
import { CandidatureViewComponent } from 'app/candidature-view/candidature-view.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'candidat',
          data: {
            authorities: [Authority.CANDIDAT],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./candidat/candidat.module').then(m => m.CandidatModule),
        },
        {
          path: 'ecole',
          data: {
            authorities: [Authority.ECOLE],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./ecole/ecole.module').then(m => m.EcoleModule),
        },
        {
          path: 'responsable',
          data: {
            authorities: [Authority.RESPONSABLE],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./responsable/responsable.module').then(m => m.ResponsableModule),
        },
        {
          path: 'filiere/:id',
          data: {
            authorities: [Authority.ECOLE, Authority.RESPONSABLE],
          },
          canActivate: [UserRouteAccessService],
          component: SharedFiliereComponent,
        },
        {
          path: 'filiere',
          data: {
            authorities: [Authority.ECOLE, Authority.RESPONSABLE],
          },
          canActivate: [UserRouteAccessService],
          component: SharedFiliereComponent,
        },
        {
          path: ':id/view',
          data: {
            authorities: [Authority.ECOLE, Authority.RESPONSABLE, Authority.CANDIDAT],
          },
          canActivate: [UserRouteAccessService],
          component: CandidatureViewComponent,
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
