import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidat-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './candidat-home.component.html',
  styleUrls: ['./candidat-home.component.scss']
})
export class CandidatHomeComponent {
  features = [
    {
      icon: 'bi bi-search',
      title: 'Explorez les Concours',
      description: 'Découvrez tous les concours disponibles et leurs détails'
    },
    {
      icon: 'bi bi-file-earmark-text',
      title: 'Postulez en Ligne',
      description: 'Soumettez votre candidature facilement via notre plateforme'
    },
    {
      icon: 'bi bi-clock-history',
      title: 'Suivi en Temps Réel',
      description: 'Consultez l\'état de vos candidatures à tout moment'
    }
  ];
}
