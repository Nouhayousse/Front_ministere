import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidat } from '../models/candidat.model';
import { Candidature } from '../models/candidature.model';
import { Diplome } from '../models/diplome.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = `${environment.apiUrl}/candidat`;

  constructor(private http: HttpClient) {}

  // Ajouter un candidat
  addCandidat(candidat: Candidat): Observable<Candidat> {
    return this.http.post<Candidat>(`${this.apiUrl}/add`, candidat);
  }

  // Login candidat
  login(email: string, password: string): Observable<Candidat> {
    return this.http.post<Candidat>(`${this.apiUrl}/search`, { email, password });
  }

  // Récupérer un candidat par ID
  getById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un candidat
  update(id: number, candidat: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/${id}`, candidat);
  }

  // Récupérer les candidatures d'un candidat
  getCandidatures(id: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/${id}/candidatures`);
  }

  // Créer une candidature pour un candidat
  createCandidature(candidature: Candidature): Observable<Candidature> {
    return this.http.post<Candidature>(`${this.apiUrl}/candidatures`, candidature);
  }

  getAll(): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.apiUrl);
  }

  // Ajouter un diplôme à une candidature
  uploadDiplome(candidatureId: number, diplome: Diplome): Observable<Diplome> {
    return this.http.post<Diplome>(`${this.apiUrl}/candidatures/${candidatureId}/diplomes`, diplome);
  }

  // Supprimer un candidat
  deleteCandidat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  count() {
    return this.http.get<number>(`${this.apiUrl}/nbr`);
  }
}
