import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ConcoursService } from '../../../services/concours.service';

@Component({
  selector: 'app-admin-concours-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-concours-list.component.html',
  styleUrls: ['./admin-concours-list.component.scss']
})
export class AdminConcoursListComponent implements OnInit {
  concoursList: any[] = [];
  filteredConcours: any[] = [];
  searchTerm: string = '';

  constructor(private concoursService: ConcoursService, private router: Router) {}

  ngOnInit() {
    this.loadConcours();
  }

  loadConcours() {
    this.concoursService.getAllConcours().subscribe({
      next: (data) => {
        this.concoursList = data;
        this.filteredConcours = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des concours:', error);
      }
    });
  }

  filterConcours() {
    if (!this.searchTerm.trim()) {
      this.filteredConcours = this.concoursList;
      return;
    }

    this.filteredConcours = this.concoursList.filter(concours => 
      concours.nomConcours.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      concours.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      concours.lieu.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isConcoursEnCours(dateFin: string): boolean {
    return new Date(dateFin) > new Date();
  }

  getStatutClass(dateFin: string): string {
    return this.isConcoursEnCours(dateFin) ? 'bg-success' : 'bg-danger';
  }

  getStatutLabel(dateFin: string): string {
    return this.isConcoursEnCours(dateFin) ? 'En cours' : 'Terminé';
  }

  modifierConcours(id: number) {
    this.router.navigate(['/admin/concours/edit', id]);
  }

  supprimerConcours(id: number) {
    if(confirm('Êtes-vous sûr de vouloir supprimer ce concours ?')) {
      this.concoursService.deleteConcours(id).subscribe({
        next: () => {
          this.loadConcours();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}
