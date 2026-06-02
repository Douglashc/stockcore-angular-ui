import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-stock-movement-form',
  templateUrl: './stock-movement-form.component.html',
  styleUrls: ['./stock-movement-form.component.scss']
})
export class StockMovementFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public movementForm!: FormGroup;

  public movementTypes = ['INGRESO', 'EGRESO', 'AJUSTE', 'MERMA'];
  public branchesList = signal([{ id: 1, name: 'Sucursal mundo compra' }, { id: 2, name: 'Sucursal dulce venta' }]);
  public productsList = signal([{ id: 1, name: 'Lavandina para Piso' }, { id: 4, name: 'Guantes de Nitrilo' }]);

  public allLotes = signal([
    { id: 1, code: 'COD-0001', productId: 1 },
    { id: 2, code: 'LOT-0002', productId: 4 }
  ]);

  public filteredLotes = signal<{ id: number, code: string }[]>([]);

  ngOnInit(): void {
    this.initForm();

    this.movementForm.get('productId')?.valueChanges.subscribe(prodId => {
      const lotes = this.allLotes().filter(l => l.productId === Number(prodId));
      this.filteredLotes.set(lotes);
      this.movementForm.get('loteId')?.setValue(null);
    });
  }

  private initForm(): void {
    this.movementForm = this.#fb.group({
      type: [null, [Validators.required]],
      productId: [null, [Validators.required]],
      loteId: [null, [Validators.required]],
      branchId: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      observation: ['', [Validators.maxLength(250)]],
      userId: [1] 
    });
  }

  save(): void {
    if (this.movementForm.invalid) return;

    const val = this.movementForm.value;
    const payload = {
      ...val,
      productId: Number(val.productId),
      loteId: Number(val.loteId),
      branchId: Number(val.branchId),
      quantity: Number(val.quantity)
    };

    console.log('Registrando movimiento de inventario en OmniLink:', payload);
    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
