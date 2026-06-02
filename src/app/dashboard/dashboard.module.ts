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
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { LotesPageComponent } from './pages/lotes-page/lotes-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { LoteFormComponent } from './components/lots/lote-form/lote-form.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { SupplierFormComponent } from './components/suppliers/supplier-form/supplier-form.component';
import { SuppliersPageComponent } from './pages/suppliers-page/suppliers-page.component';
import { BranchFormComponent } from './components/branches/branch-form/branch-form.component';
import { BranchesPageComponent } from './pages/branches-page/branches-page.component';
import { BuyFormComponent } from './components/buys/buy-form/buy-form.component';
import { BuysPageComponent } from './pages/buys-page/buys-page.component';
import { SaleFormComponent } from './components/sales/sale-form/sale-form.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { StockMovementFormComponent } from './components/stock-movements/stock-movement-form/stock-movement-form.component';
import { StockMovementsPageComponent } from './pages/stock-movements-page/stock-movements-page.component';
import { InventariesPageComponent } from './pages/inventaries-page/inventaries-page.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    SummaryPageComponent,
    CategoriesPageComponent,
    ProductsPageComponent,
    LotesPageComponent,
    UsersPageComponent,

    CategoryFormComponent,
    ProductFormComponent,
    LoteFormComponent,
    UserFormComponent,
    ClientFormComponent,
    ClientsPageComponent,
    SupplierFormComponent,
    SuppliersPageComponent,
    BranchFormComponent,
    BranchesPageComponent,
    BuyFormComponent,
    BuysPageComponent,
    SaleFormComponent,
    SalesPageComponent,
    StockMovementFormComponent,
    StockMovementsPageComponent,
    InventariesPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
