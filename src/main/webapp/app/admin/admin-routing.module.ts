import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EcoleManagementComponent } from 'app/admin/ecole-management/ecole-management.component';
import { DashboardComponent } from 'app/admin/dashboard/dashboard.component';

/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
          pageTitle: 'Users',
        },
      },
      {
        path: 'ecole-management',
        component: EcoleManagementComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class AdminRoutingModule {}
