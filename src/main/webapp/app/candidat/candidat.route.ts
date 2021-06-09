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
      pageTitle: 'Welcome, Java Hipster!',
    },
  },
  {
    path: 'ecole/:id',
    component: ParcoursComponent,
    data: {
      pageTitle: 'Welcome, Java Hipster!',
    },
  },
  {
    path: 'parcours/:id',
    component: FiliereComponent,
    data: {
      pageTitle: 'Welcome, Java Hipster!',
    },
  },
  {
    path: 'filiere/:id',
    component: CandidatureComponent,
    data: {
      pageTitle: 'Welcome, Java Hipster!',
    },
  },
];
