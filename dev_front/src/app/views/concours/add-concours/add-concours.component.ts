import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConcoursService } from '../../../services/concours.service';
import { GradeService } from '../../../services/grade.service';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-concours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-concours.component.html',
  styleUrls: ['./add-concours.component.scss']
})
export class AddConcoursComponent implements OnInit {
  concoursForm!: FormGroup;
  grades: any[] = [];
  ajoutReussi = false;
 

  constructor(
    private fb: FormBuilder,
    private concoursService: ConcoursService,
    private gradeService: GradeService,
    
    private router: Router
  ) {}

  ngOnInit() {
    this.concoursForm = this.fb.group({
      nomConcours: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      conditions: ['', Validators.required],
      nombrePostes: [null, Validators.required],
      lieu: ['', Validators.required],
      datePubResultats: ['', Validators.required],
      publicCible: ['', Validators.required],
      grade: [null, Validators.required],
      epreuves: this.fb.array([])
    });

    this.gradeService.getAllGrades().subscribe(data => this.grades = data);
  
  }

  get epreuves() {
    return this.concoursForm.get('epreuves') as FormArray;
  }

  ajouterEpreuve() {
    this.epreuves.push(this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      typeEpreuve: ['', Validators.required],
      dateEpreuve: ['', Validators.required],
      duree: [null, Validators.required],
      lieu: ['', Validators.required],
      coefficient: [null, Validators.required],
      seuilEliminatoire: [null, Validators.required],
      nbRetenus: [null, Validators.required],
      estPassee: [false]
    }));
  }

  supprimerEpreuve(index: number) {
    this.epreuves.removeAt(index);
  }

  onSubmit() {
    if (this.concoursForm.valid) {
      const concours = { ...this.concoursForm.value };
      concours.grade = { id: concours.grade };
      this.concoursService.addConcours(concours).subscribe({
        next: () => {
          this.ajoutReussi = true;
        },
        error: () => alert('Erreur lors de l\'ajout du concours.')
      });
    }
  }

  ajouterNouveau() {
    this.ajoutReussi = false;
    this.concoursForm.reset();
    // Réinitialise aussi les épreuves si besoin
    while (this.epreuves.length) {
      this.epreuves.removeAt(0);
    }
  }

  
}
