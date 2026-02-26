import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = `${environment.apiUrl}/grades`;

  constructor(private http: HttpClient) { }

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }
}
