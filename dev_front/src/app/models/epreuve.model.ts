import { AuditDto } from './auditDto.model';
export interface Epreuve extends AuditDto {
    titre: string;
    description: string;
    typeEpreuve: TypeEpreuve;
    dateEpreuve: Date;
    duree: number;
    lieu: string;
    coefficient: number;
    seuilEliminatoire: number;
    nbRetenus: number;
    estPassee: boolean;
}

// Example enum for TypeEpreuve (adjust as needed)
export enum TypeEpreuve {
    // Example values
    ECRITE = 'ECRITE',
    ORALE = 'ORALE'
}