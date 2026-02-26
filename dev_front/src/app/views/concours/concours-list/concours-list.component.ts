import { Component, OnInit } from '@angular/core';
import { ConcoursService } from '../../../services/concours.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-concours-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './concours-list.component.html',
  styleUrls: ['./concours-list.component.scss']
})
export class ConcoursListComponent implements OnInit {
  concoursList: any[] = [];
  selectedConcours: any = null;
  epreuves: any[] = [];
  epreuvesVisible: boolean = false;
  epreuvesModalVisible: boolean = false;

  // Filtres
  searchText: string = '';
  dateDebut: string = '';
  dateFin: string = '';

  constructor(private concoursService: ConcoursService, private router: Router) {}

  ngOnInit() {
    this.concoursService.getAllConcours().subscribe(data => {
      this.concoursList = data;
    });
  }

  voirDetails(concours: any) {
    this.selectedConcours = concours;
  }

  fermerDetails() {
    this.selectedConcours = null;
  }

  postuler(concours: any) {
    // Modification de la route pour correspondre à la nouvelle structure
    this.router.navigate(['/candidat/postuler', concours.id]);
  }

  afficherEpreuves(concoursId: number) {
    this.concoursService.getEpreuvesByConcoursId(concoursId).subscribe(data => {
      this.epreuves = data;
      this.epreuvesModalVisible = true;
    });
  }

  fermerEpreuves() {
    this.epreuvesModalVisible = false;
    this.epreuves = [];
  }

  get filteredConcours() {
    return this.concoursList.filter(concours => {
      const keyword = this.searchText?.toLowerCase() || '';
      const desc = concours.description?.toLowerCase() || '';
      const nom = concours.nomConcours?.toLowerCase() || '';

      // Filtre mot-clé sur nom ou description
      const matchKeyword = !keyword || desc.includes(keyword) || nom.includes(keyword);

      // Filtre date début
      const matchDebut = !this.dateDebut || (concours.dateDebut && concours.dateDebut >= this.dateDebut);

      // Filtre date fin
      const matchFin = !this.dateFin || (concours.dateFin && concours.dateFin <= this.dateFin);

      return matchKeyword && matchDebut && matchFin;
    });
  }

  resetFilters() {
    this.searchText = '';
    this.dateDebut = '';
    this.dateFin = '';
  }

  isConcoursActive(concours: any): boolean {
    const today = new Date();
    const dateFin = new Date(concours.dateFin);
    return dateFin >= today;
  }
}
