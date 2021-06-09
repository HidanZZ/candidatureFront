import { Route } from '@angular/router';
import { ParcoursComponent } from 'app/candidat/parcours/parcours.component';
import { FiliereComponent } from 'app/candidat/filiere/filiere.component';

export const EcoleRoutes: Route[] = [
  {
    path: '',
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
];
