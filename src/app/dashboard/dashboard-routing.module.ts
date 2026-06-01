import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { LotesPageComponent } from './pages/lotes-page/lotes-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'summary', component: SummaryPageComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'lots', component: LotesPageComponent },
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
