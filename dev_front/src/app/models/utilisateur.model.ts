import { AuditDto } from './auditDto.model';
export interface Utilisateur extends AuditDto {
    nom: string;
    email: string;
    //password?: string; // Optional, as it's usually write-only
    profil: 'ADMIN' | 'CANDIDAT' | 'RECRUTEUR';
}
