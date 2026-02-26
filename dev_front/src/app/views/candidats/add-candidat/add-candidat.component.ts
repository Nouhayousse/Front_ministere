import { Component, Output, EventEmitter } from '@angular/core';
import { CandidatService } from '../../../services/candidat.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent, CardBodyComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss'],
  standalone: true,
  imports: [FormsModule, CardComponent, CardBodyComponent, CommonModule],
  providers: [CandidatService]
})
export class AddCandidatComponent {
  candidat: any = {};
  success = false;

  @Output() candidatCree = new EventEmitter<any>();

  constructor(private candidatService: CandidatService) {}

  onSubmit() {
    this.candidatService.addCandidat(this.candidat).subscribe({
      next: (candidatCree) => {
        this.success = true;
        this.candidatCree.emit(candidatCree); // Émet le candidat créé au parent
        // Ne pas naviguer ici, laisse le wizard gérer la suite
      }
    });
  }
}
