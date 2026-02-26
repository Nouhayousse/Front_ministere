import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- ajoute ceci


@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class CandidaturesComponent {}
