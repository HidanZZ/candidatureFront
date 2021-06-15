import { Route } from '@angular/router';
import { EcoleListComponent } from 'app/candidat/ecole-list/ecole-list.component';
import { ParcoursComponent } from 'app/candidat/parcours/parcours.component';
import { FiliereComponent } from 'app/candidat/filiere/filiere.component';
import { CandidatureComponent } from 'app/candidat/candidature/candidature.component';

export const CandidatRoutes: Route[] = [
  {
    path: '',
    component: EcoleListComponent,
    data: {
      pageTitle: 'Futur Uni!',
    },
  },
  {
    path: 'ecole/:id',
    component: ParcoursComponent,
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
  {
    path: 'filiere/:id',
    component: CandidatureComponent,
    data: {
      pageTitle: 'Futur Uni!',
    },
  },
];
