import { Routes } from '@angular/router';
import { CandidatsComponent } from './candidats.component';
import { ListCandidatsComponent } from './list-candidats/list-candidats.component';
import { AddCandidatComponent } from './add-candidat/add-candidat.component';

export const routes: Routes = [
  {
    path: '',
    component: CandidatsComponent,
    children: [
      { path: 'list', component: ListCandidatsComponent },
      { path: 'add', component: AddCandidatComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      
    ]
  }
];
