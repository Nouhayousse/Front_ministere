import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardBodyComponent } from '@coreui/angular';
import { CandidatService } from '../../../services/candidat.service';
import { Candidat } from '../../../models/candidat.model';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';


@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styleUrls: ['./list-candidats.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent, CardBodyComponent, FormsModule, IconDirective],
  providers: [CandidatService]
})
export class ListCandidatsComponent implements OnInit {
  candidats: Candidat[] = [];
  searchText: string = '';
  filterGenre: string = '';

  constructor(private candidatService: CandidatService) {}

  ngOnInit(): void {
    this.candidatService.getAll().subscribe(data => {
      this.candidats = data;
    });
  }

  filteredCandidats() {
    return this.candidats.filter(c =>
      (!this.searchText || c.nomFr?.toLowerCase().includes(this.searchText.toLowerCase()) || c.prenomFr?.toLowerCase().includes(this.searchText.toLowerCase()))
      && (!this.filterGenre || c.genre === this.filterGenre)
    );
  }

  viewCandidat(c: Candidat) {
    // À compléter
  }
  editCandidat(c: Candidat) {
    alert('Éditer candidat : ' + c.nomFr + ' ' + c.prenomFr);

    // À compléter
  }
  deleteCandidat(c: Candidat) {
    if (c.id === undefined) {
      alert('Impossible de supprimer ce candidat : identifiant manquant.');
      return;
    }
    if (confirm('Voulez-vous vraiment supprimer ce candidat ?')) {
      this.candidatService.deleteCandidat(c.id).subscribe(() => {
        // Retirer le candidat de la liste locale après suppression
        this.candidats = this.candidats.filter(x => x.id !== c.id);
      });
    }
  }
}
