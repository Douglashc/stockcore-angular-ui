import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private router = inject( Router );

  @Output() onToggleMenu = new EventEmitter<void>();
  isProfileMenuOpen = false;

  constructor() {}

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  menuClick(): void {
    this.onToggleMenu.emit();
  }

  onExit() : void {

    this.router.navigateByUrl('auth/login');

  }

}
