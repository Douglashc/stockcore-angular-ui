import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CardSimpleCountComponent } from './components/cards/card-simple-count/card-simple-count.component';
import { DialogContainerComponent } from './components/dialogs/dialog-container/dialog-container.component';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    PaginatorComponent,
    CardSimpleCountComponent,
    DialogContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeToggleComponent,
    PaginatorComponent,
    CardSimpleCountComponent,
    DialogContainerComponent
  ]
})
export class SharedModule { }
