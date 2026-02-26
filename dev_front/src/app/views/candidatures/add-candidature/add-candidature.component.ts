import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent, CardBodyComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { CandidatureService } from '../../../services/candidature.service';

@Component({
  selector: 'app-add-candidature',
  templateUrl: './add-candidature.component.html',
  styleUrls: ['./add-candidature.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, CardComponent, CardBodyComponent]
})
export class AddCandidatureComponent implements OnInit {
  @Input() candidat: any;
  @Input() concoursId: number | null = null;
  @Output() candidatureCree = new EventEmitter<void>();

  candidatureDto: any = {
    valide: true,
    candidat: {},
    concours: { id: null },
    diplomes: [
      {
        intitule: '',
        ecole: '',
        dateDebut: '',
        dateFin: '',
        estActuelle: false,
        niveau: '',
        domaine: ''
      }
    ],
    cin: { numeroCIN: '' }
  };

  diplomesFiles: File[] = [];
  cinFile: File | null = null;
  cvFile: File | null = null;
  demandeFile: File | null = null;

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit() {
    if (this.concoursId) {
      this.candidatureDto.concours.id = this.concoursId;
    }
    if (this.candidat) {
      this.candidatureDto.candidat = { id: this.candidat.id };
    }
  }

  onDiplomesSelected(event: any) {
    this.diplomesFiles = Array.from(event.target.files);
  }
  onCinSelected(event: any) {
    this.cinFile = event.target.files[0];
  }
  onCvSelected(event: any) {
    this.cvFile = event.target.files[0];
  }
  onDemandeSelected(event: any) {
    this.demandeFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.concoursId) {
      console.error('ID du concours manquant');
      return;
    }
    // Met à jour le candidat si besoin
    if (this.candidat) {
      this.candidatureDto.candidat = { id: this.candidat.id };
    }

    const formData = new FormData();
    formData.append('candidature', JSON.stringify(this.candidatureDto));
    this.diplomesFiles.forEach(file => formData.append('diplomesFiles', file));
    if (this.cinFile) formData.append('cin', this.cinFile);
    if (this.cvFile) formData.append('cv', this.cvFile);
    if (this.demandeFile) formData.append('demande', this.demandeFile);

    this.candidatureService.createWithFiles(formData).subscribe({
      next: (res) => {
        this.candidatureCree.emit(); // Signale la réussite au wizard
      }
    });
  }
}
