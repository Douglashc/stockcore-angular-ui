import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'shared-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {

  @Input() isAuth: boolean = true;

  constructor(public themeService: ThemeService) { }

  toggle(): void {
    this.themeService.toggleTheme();
  }

}
