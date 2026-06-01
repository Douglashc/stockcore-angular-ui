import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

import { DialogContainerComponent } from './components/dialogs/dialog-container/dialog-container.component';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    DialogContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeToggleComponent,
    DialogContainerComponent
  ]
})
export class SharedModule { }
