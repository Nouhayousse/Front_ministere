import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { CandidatLayoutComponent } from './layout/candidat-layout/candidat-layout.component';
import { AuthGuard } from './guards/auth.guard' // Assurez-vous d'importer votre AuthGuard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard], // Ajoute le guard ici
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },

      {
        path: 'import-notes',
        loadComponent: () => import('./views/import-notes/import-notes.component').then(m => m.ImportNotesComponent)
      },

      {
        path: 'candidatures',
        loadChildren: () => import('./views/candidatures/routes').then(m => m.routes)
      },
      {
        path: 'candidats',
        loadChildren: () => import('./views/candidats/routes').then(m => m.routes)
      },
      {
       path: 'concours',
        loadChildren: () => import('./views/concours/routes').then(m => m.routes)
      },

      {
        path: 'epreuves',
        loadChildren: () => import('./views/epreuves/routes').then(m => m.routes)
      },
      {
        path: 'resultats',
        loadChildren: () => import('./views/resultats/routes').then(m => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: 'candidat',
    component: CandidatLayoutComponent,
    children: [

      {
      path: '',
      loadComponent: () => import('./views/candidat-home/candidat-home.component').then(m => m.CandidatHomeComponent)
    },

      {
        path: 'concoursList',
        loadComponent: () => import('./views/concours/concours-list/concours-list.component').then(m => m.ConcoursListComponent)
      },
      {
      path: 'suivi-candidature',
      loadComponent: () => import('./views/suivi-candidature/suivi-candidature.component').then(m => m.SuiviCandidatureComponent)
    },
    {
      path: 'postuler/:id',  // Ajoute ce paramètre pour l'ID du concours
      loadComponent: () => import('./views/candidatures/ajout-candidature-wizard/ajout-candidature-wizard.component').then(m => m.AjoutCandidatureWizardComponent)
    }
      // autres pages côté candidat...
    ]
  },

  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
