import { Candidature } from "./candidature.model";
import { Epreuve } from "./epreuve.model";
import { AuditDto } from "./auditDto.model";

export interface Resultat extends AuditDto {
    candidature: Candidature; // Remplacez 'any' par le type approprié, ex: Candidature
    epreuve: Epreuve;     // Remplacez 'any' par le type approprié, ex: Epreuve
    note: number;
    classement: number;
    estAbscent: boolean;
    estElligible: boolean;
}