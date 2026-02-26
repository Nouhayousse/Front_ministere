import { AuditDto } from "./auditDto.model";
import { Candidature } from './candidature.model';
import { Epreuve } from './epreuve.model';
import { Grade } from './grade.model';


export interface Concours extends AuditDto {
    nomConcours: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    conditions: string;
    nombrePostes: number;
    lieu: string;
    datePubResultats: Date;
    publicCible: string;
    epreuves: Epreuve[];
    grade: Grade;
}