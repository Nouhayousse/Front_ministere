import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- ajoute ceci

@Component({
  selector: 'app-candidats',
  imports: [RouterOutlet], // <-- ajoute ceci
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent {

}
