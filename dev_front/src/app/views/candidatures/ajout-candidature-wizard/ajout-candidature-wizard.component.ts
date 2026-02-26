import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCandidatComponent } from '../../candidats/add-candidat/add-candidat.component';
import { AddCandidatureComponent } from '../add-candidature/add-candidature.component';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-candidature-wizard',
  standalone: true,
  imports: [CommonModule, AddCandidatComponent, AddCandidatureComponent, RouterModule],
  templateUrl: './ajout-candidature-wizard.component.html',
  styleUrls: ['./ajout-candidature-wizard.component.scss']
})
export class AjoutCandidatureWizardComponent implements OnInit {
  step = 1;
  candidatCree: any = null;
  concoursId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupère l'ID depuis les paramètres de route
    this.route.params.subscribe(params => {
      this.concoursId = +params['id']; // Le + convertit en nombre
      console.log('ID du concours:', this.concoursId); // Pour déboguer
    });
  }

  onCandidatCree(candidat: any) {
    this.candidatCree = candidat;
    this.step = 2;
  }

  onCandidatureCree() {
    this.step = 3;
  }

  retourEtape1() {
    this.step = 1;
    this.candidatCree = null;
  }
}
