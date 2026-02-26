import { FileDto } from "./fileDto.model";

export interface Diplome extends FileDto{
    intitule: string;
    ecole: string;
    dateDebut: Date;
    dateFin: Date;
    estActuelle: boolean;
    niveau: Niveau;
    domaine: string;
   
}

export enum Niveau {
    LICENCE = 'LICENCE',
    MASTER = 'MASTER',
    DOCTORAT = 'DOCTORAT',
    BTS = 'BTS',
    DUT = 'DUT',
    CYCLE = 'CYCLE',
    BACCALAUREAT = 'BACCALAUREAT',
    DEUG = 'DEUG',
    DEUST = 'DEUST'
    // Add other levels as needed
}
