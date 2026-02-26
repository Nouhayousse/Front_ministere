import { Routes } from '@angular/router';
import { CandidaturesComponent } from './candidatures.component';
import { ListCandidaturesComponent } from './list-candidatures/list-candidatures.component';
import { AddCandidatureComponent } from './add-candidature/add-candidature.component';
import { ListeCandidatsAcceptesComponent } from './liste-candidats-acceptes/liste-candidats-acceptes.component';
import { AjoutCandidatureWizardComponent } from './ajout-candidature-wizard/ajout-candidature-wizard.component';

export const routes: Routes = [
  {
    path: '',
    component: CandidaturesComponent,
    children: [
      { path: 'list', component: ListCandidaturesComponent },
      { path: 'add', component: AddCandidatureComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'acceptes', component: ListeCandidatsAcceptesComponent },
      { path: 'wizard', component: AjoutCandidatureWizardComponent }
    ]
  }
];
