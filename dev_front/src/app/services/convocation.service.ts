import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, Alignment } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConvocationService {
  constructor() {
    pdfMake.vfs = pdfFonts.vfs;
  }

  generateConvocation(candidature: any) {
    try {
      console.log('Generating convocation for:', candidature);

      const epreuveEcrite = candidature.concours?.epreuves?.find((e: any) => e.typeEpreuve === 'ECRITE');
      const epreuveOrale = candidature.concours?.epreuves?.find((e: any) => e.typeEpreuve === 'ORALE');

      const documentDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
          {
            text: 'CONVOCATION AU CONCOURS',
            style: 'header',
            alignment: 'center' as Alignment,
            margin: [0, 0, 0, 20]
          },
          {
            text: new Date().toLocaleDateString(),
            alignment: 'right' as Alignment,
            margin: [0, 0, 0, 20]
          },
          {
            text: [
              { text: 'Référence: ', bold: true },
              `${candidature.id}\n\n`,
              { text: 'Candidat: ', bold: true },
              `${candidature.candidat?.nomFr} ${candidature.candidat?.prenomFr}\n`,
              { text: 'CIN: ', bold: true },
              `${candidature.cin?.numeroCIN}\n\n`,
              { text: 'Concours: ', bold: true },
              `${candidature.concours?.nomConcours}\n\n`
            ]
          },
          {
            text: 'INFORMATIONS DES ÉPREUVES',
            style: 'subheader',
            margin: [0, 20, 0, 10]
          },
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: ['auto', '*', '*'],
              body: [
                ['Type d\'épreuve', 'Date', 'Lieu'],
                ['Écrite', 
                  epreuveEcrite ? new Date(epreuveEcrite.dateEpreuve).toLocaleDateString() : 'Non définie',
                  epreuveEcrite?.lieu || 'Non défini'
                ],
                ['Orale', 
                  epreuveOrale ? new Date(epreuveOrale.dateEpreuve).toLocaleDateString() : 'Non définie',
                  epreuveOrale?.lieu || 'Non défini'
                ]
              ]
            }
          },
          {
            text: 'IMPORTANT',
            style: 'subheader',
            margin: [0, 20, 0, 10]
          },
          {
            ul: [
              'Se présenter 30 minutes avant le début des épreuves',
              'Porter une tenue correcte',
              'Apporter cette convocation',
              'Apporter votre CIN originale',
              'Apporter le matériel nécessaire (stylos, calculatrice si autorisée)'
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            margin: [0, 0, 0, 20]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 20, 0, 10]
          }
        },
        defaultStyle: {
          fontSize: 12,
          lineHeight: 1.5
        }
      };

      console.log('Document definition created');
      return pdfMake.createPdf(documentDefinition);
    } catch (error) {
      console.error('Error generating convocation:', error);
      throw error;
    }
  }
}
