import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CandidatureService } from './candidature.service';
import { CandidatService } from './candidat.service';
import { ConcoursService } from './concours.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private candidatureService: CandidatureService,
    private candidatService: CandidatService,
    private concoursService: ConcoursService
  ) {}

  getDashboardStats() {
    return forkJoin({
      totalCandidatures: this.candidatureService.count(),
      totalCandidats: this.candidatService.count(),
      totalConcours: this.concoursService.count()
      // Ajoutez d'autres stats selon vos besoins
    });
  }
}
