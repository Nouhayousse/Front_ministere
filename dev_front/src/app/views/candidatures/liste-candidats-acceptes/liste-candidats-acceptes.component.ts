import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidatureService } from '../../../services/candidature.service';

@Component({
  selector: 'app-liste-candidats-acceptes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-candidats-acceptes.component.html',
  styleUrls: ['./liste-candidats-acceptes.component.scss']
})
export class ListeCandidatsAcceptesComponent {
  nomConcours: string = '';
  candidats: any[] = [];

  constructor(private candidatureService: CandidatureService) {}

  rechercher() {
    this.candidatureService.getCandidaturesByStatusAndConcours('ACCEPTE', this.nomConcours)
      .subscribe(data => {
        this.candidats = data.map(c => c.candidat); // extrait les candidats
      });
  }
}
