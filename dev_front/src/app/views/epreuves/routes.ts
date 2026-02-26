import { Routes } from '@angular/router';
import { EpreuvesComponent } from './epreuves.component';

export const routes: Routes = [
  {
    path: '',
    component: EpreuvesComponent,
    data: {
      title: 'Epreuves'
    }
  }
];
