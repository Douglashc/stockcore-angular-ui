import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoteResponseInterface } from '../../interfaces/lote/lote-response.interface';
import { LoteFormComponent } from '../../components/lots/lote-form/lote-form.component';
import { LotsAllData } from '../../data/lotes/lots-all.data';

@Component({
  selector: 'app-lotes-page',
  templateUrl: './lotes-page.component.html',
  styleUrls: ['./lotes-page.component.scss']
})
export class LotesPageComponent implements OnDestroy {

  readonly #dialogService = inject(DialogService);
  readonly #destroy$ = new Subject<void>();

  public searchTerm = signal<string>('');
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(5);

  public lotes = signal<LoteResponseInterface[]>(LotsAllData);

  public searchedLotes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.lotes();
    return this.lotes().filter(l =>
      l.code.toLowerCase().includes(term) || l.productName.toLowerCase().includes(term)
    );
  });

  public totalPages = computed(() => {
    return Math.ceil(this.searchedLotes().length / this.itemsPerPage()) || 1;
  });

  public pagedLotes = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.searchedLotes().slice(startIndex, endIndex);
  });

  public totalLotesCount = computed(() => this.lotes().length);

  checkStatus(expirationStr: string): 'VENCIDO' | 'CRÍTICO' | 'AL CORRIENTE' {
    const expDate = new Date(expirationStr);
    const today = new Date();

    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'VENCIDO';
    if (diffDays <= 20) return 'CRÍTICO'; 
    return 'AL CORRIENTE';
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);
  }

  openFormDialog(loteId: number | null = null): void {
    this.#dialogService.open(LoteFormComponent, {
      width: '550px',
      data: { loteId }
    })
      .afterClosed()
      .pipe(takeUntil(this.#destroy$))
      .subscribe(result => {
        if (result === 'REFRESH') {
          console.log('Recargando lotes operativos de la BD, bro ggg');
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

}
