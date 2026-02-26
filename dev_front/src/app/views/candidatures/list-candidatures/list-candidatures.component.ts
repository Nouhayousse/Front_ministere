import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Candidature } from '../../../models/candidature.model';
import { CommonModule } from '@angular/common';
import { CardComponent, CardBodyComponent } from '@coreui/angular';
import { CandidatureService } from '../../../services/candidature.service';
import { ConcoursService} from '../../../services/concours.service';
import { Concours } from '../../../models/concours.model';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-list-candidatures',

  templateUrl: './list-candidatures.component.html',
  styleUrls: ['./list-candidatures.component.scss'],
  imports: [CommonModule, CardComponent, CardBodyComponent, FormsModule, IconDirective, RouterLink]
})
export class ListCandidaturesComponent implements OnInit {
  candidatures: Candidature[] = [];
  selectedCandidature: Candidature | null = null;
  newCandidature: Candidature = {} as Candidature;
  concoursSelectionne: string | null = null;
  concoursList: Concours[] = [];

  constructor(private candidatureService: CandidatureService,
    private router: Router,
    private concoursService: ConcoursService
  ) {}

  ngOnInit(): void {
    this.loadCandidatures();
    this.loadConcours();
  }


  loadCandidatures() {
    this.candidatureService.getAll().subscribe(data => {
      this.candidatures = data;
    });
  }

  loadConcours() {
    this.concoursService.getAllConcours().subscribe(data => {
      console.log('Concours reçus:', data);
      this.concoursList = data;
    });
  }

  addCandidature() {
    const formData = new FormData();
    formData.append('candidat', JSON.stringify(this.newCandidature));
    this.candidatureService.createWithFiles(formData).subscribe(() => {
      this.loadCandidatures();
      this.newCandidature = {} as Candidature;
    });
  }

  editCandidature(candidature: Candidature) {
    this.selectedCandidature = { ...candidature };
  }

  

  deleteCandidature(id: number) {
    this.candidatureService.delete(id).subscribe(() => {
      this.loadCandidatures();
    });
  }

  cancelEdit() {
    this.selectedCandidature = null;
  }

    noteSeuil: number = 10;
  nombreAPrendre: number = 0;

  appliquerSelection() {
    if (!this.concoursSelectionne && !this.noteSeuil) {
      alert('Veuillez sélectionner un concours et définir un seuil');
      return;
    }

    // Filtrer les candidatures par concours si sélectionné
    let candidaturesFiltrees = this.candidatures;
    if (this.concoursSelectionne) {
      candidaturesFiltrees = this.candidatures.filter(
        c => c.concours.nomConcours === this.concoursSelectionne
      );
    }

    // Filtrer par seuil et trier par note décroissante
    let candidatsEligibles = candidaturesFiltrees
      .filter(c => c.noteGlobale >= this.noteSeuil)
      .sort((a, b) => (b.noteGlobale || 0) - (a.noteGlobale || 0));

    if (this.nombreAPrendre > 0 && candidatsEligibles.length > 0) {
      // Gérer les notes égales à la limite
      const indexLimite = Math.min(this.nombreAPrendre - 1, candidatsEligibles.length - 1);
      const noteLimite = candidatsEligibles[indexLimite].noteGlobale;
      
      // Inclure tous les candidats ayant la même note que la limite
      candidatsEligibles = candidatsEligibles.filter(c => c.noteGlobale >= noteLimite);
    }

    // Mettre à jour le statut de toutes les candidatures
    this.candidatures.forEach(c => {
      if (this.concoursSelectionne && c.concours.nomConcours !== this.concoursSelectionne) {
        return; // Ne pas modifier les autres concours
      }

      const estAccepte = candidatsEligibles.some(eligible => eligible.id === c.id);
      c.status = estAccepte ? 'ACCEPTE' : 'REFUSE';

      if (c.id !== undefined) {
        this.candidatureService.update(c.id, c).subscribe({
          error: (err) => console.error(`Erreur mise à jour candidature ${c.id}:`, err)
        });
      }
    });
  }
}
