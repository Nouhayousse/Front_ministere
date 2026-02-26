import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { CandidatureService } from '../../services/candidature.service';

@Component({
  selector: 'app-import-notes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h3>Import des Notes</h3>
        </div>
        <div class="card-body">
          <!-- Instructions -->
          <div class="alert alert-info mb-4">
            <h5>Format attendu du fichier Excel:</h5>
            <p>Le fichier doit contenir deux colonnes :</p>
            <ul>
              <li>Reference Candidature</li>
              <li>Note Globale</li>
            </ul>
          </div>

          <!-- Upload -->
          <div class="mb-3">
            <label class="form-label">Sélectionner le fichier Excel</label>
            <input 
              type="file" 
              class="form-control" 
              (change)="onFileChange($event)"
              accept=".xlsx,.xls"
            >
          </div>

          <!-- Preview -->
          <div *ngIf="preview.length > 0" class="mt-4">
            <h4>Aperçu des données</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Reference Candidature</th>
                    <th>Note Globale</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of preview">
                    <td>{{row.idCandidature}}</td>
                    <td>{{row.note}}</td>
                    <td>
                      <span 
                        class="badge"
                        [class.bg-success]="row.status === 'success'"
                        [class.bg-danger]="row.status === 'error'"
                      >
                        {{row.status === 'success' ? 'Prêt' : 'Erreur'}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button 
              class="btn btn-primary"
              (click)="importNotes()"
              [disabled]="importing || !hasValidData"
            >
              {{importing ? 'Importation en cours...' : 'Insérer les notes'}}
            </button>
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="alert alert-success mt-4">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class ImportNotesComponent {
  preview: any[] = [];
  importing = false;
  successMessage: string = '';

  constructor(
    private candidatureService: CandidatureService,
    private router: Router
  ) {}

  get hasValidData(): boolean {
    return this.preview.some(row => row.status === 'success');
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      this.preview = data.map((row: any) => ({
        idCandidature: row['ID Candidature'],
        note: row['Note Globale'],
        status: this.validateRow(row) ? 'success' : 'error'
      }));
    };

    reader.readAsBinaryString(file);
  }

  validateRow(row: any): boolean {
    const note = parseFloat(row['Note Globale']);
    return (
      row['ID Candidature'] &&
      !isNaN(note) &&
      note >= 0 &&
      note <= 20
    );
  }

  async importNotes() {
    if (!this.preview.length) return;

    this.importing = true;
    let successCount = 0;
    let errorCount = 0;

    for (const row of this.preview.filter(r => r.status === 'success')) {
      try {
        await this.candidatureService
          .updateNoteGlobale(row.idCandidature, row.note)
          .toPromise();
        successCount++;
      } catch (error) {
        console.error(`Erreur pour la candidature ${row.idCandidature}:`, error);
        errorCount++;
      }
    }

    this.importing = false;
    
    if (successCount > 0) {
      this.successMessage = `Import réussi: ${successCount} notes importées`;
      // Attendre 2 secondes avant la redirection
      setTimeout(() => {
        this.router.navigate(['/admin/candidatures']);
      }, 2000);
    } else {
      alert('Aucune note n\'a été importée');
    }
  }
}
