import { Component, Input, signal } from '@angular/core';
import { MenuGroup } from '../../interfaces/menu/menu-group.interface';
import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout.component';
import { menuSidebarData } from '../../data/menu/menu-sidebar.data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() isMini = false;

  public menuGroups = signal<MenuGroup[]>(menuSidebarData);

  constructor(public layout: DashboardLayoutComponent) { }

  toggleMini(): void {
    this.layout.toggleSidebarMini();
  }
}
