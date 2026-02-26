
import { Candidat } from './candidat.model';
import { AuditDto } from './auditDto.model';
import { Diplome } from './diplome.model';
import { Concours } from './concours.model';
import { CV } from './cv.model';
import { Cin } from './cin.model';
import { Demande } from './demande.model';
export interface Candidature extends AuditDto {
  id?: number;
  isValide: boolean;
  noteGlobale: number;
  status: 'EN_ATTENTE' | 'ACCEPTE' | 'REFUSE'; // ou utiliser une enum si tu préfères
  candidat: Candidat;
  concours: Concours;
  diplomes: Diplome[];
  cv: CV;
  cin: Cin;
  demande: Demande;
}
