import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss']
})
export class BuyFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public buyForm!: FormGroup;

  public suppliersList = signal([{ id: 1, name: 'Gustavo Lara Pinto' }, { id: 2, name: 'Ferretería Central' }]);
  public productsList = signal([{ id: 1, name: 'Lavandina para Piso' }, { id: 4, name: 'Guantes de Nitrilo' }]);
  public lotesList = signal([{ id: 1, code: 'COD-0001' }, { id: 2, code: 'LOT-0002' }]);
  public branchesList = signal([{ id: 1, name: 'Sucursal mundo compra' }, { id: 2, name: 'Sucursal dulce venta' }]);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.buyForm = this.#fb.group({
      supplierId: [null, [Validators.required]],
      userId: [1], 
      details: this.#fb.array([])
    });

    this.addDetailRow();
  }

  get detailsFormArray(): FormArray {
    return this.buyForm.get('details') as FormArray;
  }

  addDetailRow(): void {
    const detailGroup = this.#fb.group({
      productId: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitCost: [0, [Validators.required, Validators.min(0.1)]],
      loteId: [null, [Validators.required]],
      branchId: [null, [Validators.required]]
    });
    this.detailsFormArray.push(detailGroup);
  }

  removeDetailRow(index: number): void {
    if (this.detailsFormArray.length > 1) {
      this.detailsFormArray.removeAt(index);
    }
  }

  public totalBuy = signal<number>(0);

  calculateTotal(): void {
    let currentTotal = 0;
    this.detailsFormArray.controls.forEach(control => {
      const quantity = control.get('quantity')?.value || 0;
      const unitCost = control.get('unitCost')?.value || 0;
      currentTotal += (quantity * unitCost);
    });
    this.totalBuy.set(currentTotal);
  }

  save(): void {
    if (this.buyForm.invalid) {
      this.buyForm.markAllAsTouched();
      return;
    }

    const formValue = this.buyForm.value;

    const payload = {
      supplierId: Number(formValue.supplierId),
      userId: Number(formValue.userId),
      details: formValue.details.map((d: any) => ({
        productId: Number(d.productId),
        quantity: Number(d.quantity),
        unitCost: Number(d.unitCost),
        loteId: Number(d.loteId),
        branchId: Number(d.branchId)
      }))
    };

    console.log('Enviando Transacción de Compra a OmniLink:', payload);
    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
