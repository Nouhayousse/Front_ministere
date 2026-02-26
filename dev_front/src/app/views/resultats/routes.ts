import { Routes } from '@angular/router';
import { ResultatsComponent } from './resultats.component';

export const routes: Routes = [
  {
    path: '',
    component: ResultatsComponent,
    data: {
      title: 'Resultats'
    }
  }
];
