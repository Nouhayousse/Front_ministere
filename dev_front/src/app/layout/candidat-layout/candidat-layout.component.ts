import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidat-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './candidat-layout.component.html',
  styleUrls: ['./candidat-layout.component.scss']
})
export class CandidatLayoutComponent {}
