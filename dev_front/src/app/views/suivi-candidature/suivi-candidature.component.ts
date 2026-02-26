import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidatureService } from '../../services/candidature.service';
import { RouterModule } from '@angular/router';
import { ConvocationService } from '../../services/convocation.service';


@Component({
  selector: 'app-suivi-candidature',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './suivi-candidature.component.html',
  styleUrls: ['./suivi-candidature.component.scss']
})
export class SuiviCandidatureComponent {
  cin: string = '';
  candidatures: any[] = []; // ou type Candidature[]
  loading = false;
  error = '';

  constructor(
    private candidatureService: CandidatureService, 
    private convocationService: ConvocationService,
    private datePipe: DatePipe
  ) {}

  downloadConvocation(candidature: any) {
    console.log('Candidature:', candidature);
    this.convocationService.generateConvocation(candidature).download(`convocation_${candidature.id}.pdf`);
  }
  onSubmit() {
    if (!this.cin) {
      this.error = 'Veuillez saisir votre CIN';
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    this.candidatureService.getSuiviCandidature(this.cin).subscribe({
      next: (data) => {
        console.log('Données reçues:', data);
        const dataArray = Array.isArray(data) ? data : [data];
        console.log('Épreuves:', dataArray[0]?.concours?.epreuves);
        this.candidatures = dataArray;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = 'Aucune candidature trouvée avec ce CIN';
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    if (!date) {
      console.log('Date non définie');
      return 'Non définie';
    }
    console.log('Formatage de la date:', date);
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
