import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidature } from '../models/candidature.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = `${environment.apiUrl}/candidature`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(this.apiUrl);
  }

  // Récupérer une candidature par ID
  getById(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.apiUrl}/${id}`);
  }

  // Ajout avec fichiers (multipart)
  createWithFiles(formData: FormData): Observable<Candidature> {
    return this.http.post<Candidature>(`${this.apiUrl}/Ajout`, formData);
  }
  
 

  // Modifier une candidature existante
  update(id: number, candidature: Candidature): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, candidature);
  }

  // Supprimer une candidature
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer par status
  getByStatus(status: string): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/status/${status}`);
  }

   // Récupérer les diplômes d'une candidature
  getDiplomesOfCandidature(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/diplomes`);
  }

   // Récupérer le status d'une candidature
  getStatusCandidatureById(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/status`);
  }

  getCandidaturesByStatusAndConcours(status: string, nomCnc: string): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/CNC_Status/${status}/${encodeURIComponent(nomCnc)}`);
  }

  getSuiviCandidature(cin: string): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.apiUrl}/MesCandidatures/${cin}`);
  }

  updateNoteGlobale(id: number, note: number): Observable<Candidature> {
    return this.http.put<Candidature>(`${this.apiUrl}/${id}/note?note=${note}`, {});
  }

  count() {
    return this.http.get<number>(`${this.apiUrl}/nbr`);
  }
}
