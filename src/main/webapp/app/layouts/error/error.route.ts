import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error page!',
    },
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error page!',
      errorCode: '401',
      errorMessage: 'You are not authorized to access this page.',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      pageTitle: 'Error page!',
      errorCode: '404',
      errorMessage: "Sorry we couldn't find this page.",
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
