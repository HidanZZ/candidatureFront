import { Route } from '@angular/router';
import { ParcoursComponent } from 'app/candidat/parcours/parcours.component';
import { FiliereComponent } from 'app/candidat/filiere/filiere.component';
import { EcoleViewComponent } from 'app/admin/ecole-view/ecole-view.component';

export const EcoleRoutes: Route[] = [
  {
    path: '',
    component: ParcoursComponent,
    data: {
      pageTitle: 'Futur Uni!',
    },
  },
  {
    path: ':id/view',
    component: EcoleViewComponent,
    data: {
      pageTitle: 'Futur Uni!',
    },
  },
  {
    path: 'parcours/:id',
    component: FiliereComponent,
    data: {
      pageTitle: 'Futur Uni!',
    },
  },
];
