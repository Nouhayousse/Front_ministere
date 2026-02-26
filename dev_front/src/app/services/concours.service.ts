import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Concours } from '../models/concours.model';
import { environment } from '../../environments/environment';
import { Epreuve } from '../models/epreuve.model';

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {

   private apiUrl = `${environment.apiUrl}/concours`;
  
  constructor(private http: HttpClient) { }

  getAllConcours(): Observable<Concours[]> {
    return this.http.get<Concours[]>(`${this.apiUrl}/all`);
  }

    getEpreuvesByConcoursId(concoursId: number) {
    return this.http.get<Epreuve[]>(`${this.apiUrl}/epreuves/${concoursId}`);
  }

    addConcours(concours: Concours) {
    return this.http.post<Concours>(`${this.apiUrl}/addCnc`, concours);
  }


   deleteConcours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateConcours(id: number, concours: Concours): Observable<Concours> {
    return this.http.put<Concours>(`${this.apiUrl}/${id}`, concours);
  }

  getConcoursById(id: number): Observable<Concours> {
     console.log('Fetching concours with ID:', id); // Debug log
    return this.http.get<Concours>(`${this.apiUrl}/${id}`);
  }

  count() {
    return this.http.get<number>(`${this.apiUrl}/nbr`);
  }
}
