import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConcoursService } from '../../../services/concours.service';
import { GradeService } from '../../../services/grade.service';
import { Grade } from '../../../models/grade.model';

@Component({
  selector: 'app-edit-concours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-concours.component.html',
  styleUrls: ['./edit-concours.component.scss']
})
export class EditConcoursComponent implements OnInit {
  concoursForm!: FormGroup;
  grades: Grade[] = [];
  concoursId!: number;
  loading = false;
  modificationReussie = false;

  constructor(
    private fb: FormBuilder,
    private concoursService: ConcoursService,
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadGrades();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.concoursId = +params['id'];
        this.loadConcours();
      } else {
        this.router.navigate(['/admin/concours']);
      }
    });
  }

  private initForm() {
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
  }

  private loadGrades() {
    this.gradeService.getAllGrades().subscribe(data => this.grades = data);
  }

  private loadConcours() {
    this.loading = true;
    this.concoursService.getConcoursById(this.concoursId).subscribe({
      next: (concours) => {
        console.log('Received concours data:', concours);
        if (concours) {
          try {
            // Format dates for form
            const formData = {
              nomConcours: concours.nomConcours,
              description: concours.description,
              dateDebut: this.formatDate(new Date(concours.dateDebut)),
              dateFin: this.formatDate(new Date(concours.dateFin)),
              datePubResultats: this.formatDate(new Date(concours.datePubResultats)),
              conditions: concours.conditions,
              nombrePostes: concours.nombrePostes,
              lieu: concours.lieu,
              publicCible: concours.publicCible,
              grade: concours.grade?.id
            };

            this.concoursForm.patchValue(formData);

            // Clear and reload épreuves
            const epreuvesArray = this.concoursForm.get('epreuves') as FormArray;
            while (epreuvesArray.length) {
              epreuvesArray.removeAt(0);
            }

            if (concours.epreuves && Array.isArray(concours.epreuves)) {
              concours.epreuves.forEach((epreuve: any) => {
                const epreuveFormGroup = this.fb.group({
                  id: [epreuve.id],
                  titre: [epreuve.titre, Validators.required],
                  description: [epreuve.description, Validators.required],
                  typeEpreuve: [epreuve.typeEpreuve, Validators.required],
                  dateEpreuve: [this.formatDate(new Date(epreuve.dateEpreuve)), Validators.required],
                  duree: [epreuve.duree, Validators.required],
                  lieu: [epreuve.lieu, Validators.required],
                  coefficient: [epreuve.coefficient, Validators.required],
                  seuilEliminatoire: [epreuve.seuilEliminatoire, Validators.required],
                  nbRetenus: [epreuve.nbRetenus, Validators.required],
                  estPassee: [epreuve.estPassee]
                });
                epreuvesArray.push(epreuveFormGroup);
              });
            }
          } catch (error) {
            console.error('Error processing concours data:', error);
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading concours:', error);
        this.loading = false;
        alert('Erreur lors du chargement du concours. Veuillez réessayer.');
        this.router.navigate(['/admin/concours']);
      }
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private createEpreuveFormGroup(epreuve: any = {}) {
    return this.fb.group({
      id: [epreuve.id],
      titre: [epreuve.titre || '', Validators.required],
      description: [epreuve.description || '', Validators.required],
      typeEpreuve: [epreuve.typeEpreuve || '', Validators.required],
      dateEpreuve: [this.formatDate(epreuve.dateEpreuve) || '', Validators.required],
      duree: [epreuve.duree || null, Validators.required],
      lieu: [epreuve.lieu || '', Validators.required],
      coefficient: [epreuve.coefficient || null, Validators.required],
      seuilEliminatoire: [epreuve.seuilEliminatoire || null, Validators.required],
      nbRetenus: [epreuve.nbRetenus || null, Validators.required],
      estPassee: [epreuve.estPassee || false]
    });
  }

  get epreuves() {
    return this.concoursForm.get('epreuves') as FormArray;
  }

  ajouterEpreuve() {
    console.log('Adding new epreuve'); // Debug log
    const epreuveForm = this.fb.group({
      id: [null],
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
    });

    this.epreuves.push(epreuveForm);
    console.log('Current epreuves:', this.epreuves.value); // Debug log
  }

  supprimerEpreuve(index: number) {
    this.epreuves.removeAt(index);
  }

  onSubmit() {
    if (this.concoursForm.valid) {
      this.loading = true;
      const formValue = this.concoursForm.value;
      
      // Preserve existing épreuve IDs and format data
      const epreuves = formValue.epreuves.map((epreuve: any) => ({
        ...epreuve,
        id: epreuve.id || null // Keep existing ID or set to null for new épreuves
      }));

      const concours = {
        ...formValue,
        id: this.concoursId,
        epreuves: epreuves,
        grade: { id: formValue.grade }
      };

      this.concoursService.updateConcours(this.concoursId, concours).subscribe({
        next: () => {
          this.loading = false;
          this.modificationReussie = true;
         
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.loading = false;
          alert('Erreur lors de la modification du concours');
        }
      });
    }
  }

  retourListe() {
    this.router.navigate(['/admin/concours/adminConcoursList']);
  }
}
