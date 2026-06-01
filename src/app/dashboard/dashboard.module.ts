import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

import { CategoryFormComponent } from './components/categories/category-form/category-form.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SummaryPageComponent,
    CategoriesPageComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
