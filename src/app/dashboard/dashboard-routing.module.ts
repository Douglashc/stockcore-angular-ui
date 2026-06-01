import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { LotesPageComponent } from './pages/lotes-page/lotes-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { SuppliersPageComponent } from './pages/suppliers-page/suppliers-page.component';
import { BranchesPageComponent } from './pages/branches-page/branches-page.component';
import { BuysPageComponent } from './pages/buys-page/buys-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'summary', component: SummaryPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'lots', component: LotesPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'clients', component: ClientsPageComponent },
      { path: 'suppliers', component: SuppliersPageComponent },
      { path: 'branches', component: BranchesPageComponent },
      { path: 'buys', component: BuysPageComponent },
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: '**', redirectTo: 'summary' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
