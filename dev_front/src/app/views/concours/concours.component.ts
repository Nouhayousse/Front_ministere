import { Component } from '@angular/core';
import { ConcoursListComponent } from './concours-list/concours-list.component';

@Component({
  selector: 'app-concours',
  standalone: true,
  imports: [ConcoursListComponent],
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.scss']
})
export class ConcoursComponent {}
