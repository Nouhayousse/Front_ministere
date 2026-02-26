import { AuditDto } from './auditDto.model';
export interface Candidat extends AuditDto {
  id?: number;
  nomFr: String;
  prenomFr: String;
  nomAr: String;
  prenomAr: String;
  genre: 'HOMME' | 'FEMME'; 
  dateNaissance: Date;
  lieuNaissance: String;
  ville?: String;
  pays: String;
  telephone: String;
  linkedIn?: String;
  email: String;
  password: String;
}
