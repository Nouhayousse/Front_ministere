import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  SidebarToggleDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective
  ],
  templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent {
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {
    super();
  }

  sidebarId = input('sidebar1');

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
