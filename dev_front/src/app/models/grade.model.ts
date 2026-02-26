import { AuditDto } from "./auditDto.model";
export interface Grade extends AuditDto {
    id: number;
    nom: string;
    niveau: string;
    echelle: number;
    description: string;
    // Add audit fields if needed, e.g. createdAt, updatedAt, etc.
}