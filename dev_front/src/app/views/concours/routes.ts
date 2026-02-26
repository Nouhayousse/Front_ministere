import { Routes } from '@angular/router';

export const routes: Routes = [
   {
     path: 'concoursList',
     loadComponent: () => import('./concours-list/concours-list.component').then(m => m.ConcoursListComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./add-concours/add-concours.component').then(m => m.AddConcoursComponent)
  },
  {
    path: 'adminConcoursList',
    loadComponent: () => import('./admin-concours-list/admin-concours-list.component').then(m =>
    m.AdminConcoursListComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./edit-concours/edit-concours.component').then(m => m.EditConcoursComponent)
  }

];
