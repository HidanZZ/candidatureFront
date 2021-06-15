import { Route } from '@angular/router';
import { SharedFiliereComponent } from 'app/shared-filiere/shared-filiere.component';

export const responsableRoute: Route[] = [
  {
    path: '',
    component: SharedFiliereComponent,
    data: {
      pageTitle: 'Futur Uni!',
    },
  },
];
