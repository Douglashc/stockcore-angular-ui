import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public saleForm!: FormGroup;
  public totalSale = signal<number>(0);

  public clientsList = signal([{ id: 1, name: 'Maria Lorena Lima Perez' }, { id: 2, name: 'Carlos Mendoza' }]);
  public branchesList = signal([{ id: 1, name: 'Sucursal mundo compra' }, { id: 2, name: 'Sucursal dulce venta' }]);
  public productsList = signal([{ id: 1, name: 'Lavandina para Piso' }, { id: 4, name: 'Guantes de Nitrilo' }]);
  public lotesList = signal([{ id: 1, code: 'COD-0001' }, { id: 2, code: 'LOT-0002' }]);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.saleForm = this.#fb.group({
      clientId: [null, [Validators.required]],
      branchId: [null, [Validators.required]], 
      userId: [1], 
      details: this.#fb.array([])
    });

    this.addDetailRow();
  }

  get detailsFormArray(): FormArray {
    return this.saleForm.get('details') as FormArray;
  }

  addDetailRow(): void {
    const detailGroup = this.#fb.group({
      productId: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0.1)]],
      loteId: [null, [Validators.required]]
    });
    this.detailsFormArray.push(detailGroup);
  }

  removeDetailRow(index: number): void {
    if (this.detailsFormArray.length > 1) {
      this.detailsFormArray.removeAt(index);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    let currentTotal = 0;
    this.detailsFormArray.controls.forEach(control => {
      const quantity = control.get('quantity')?.value || 0;
      const unitPrice = control.get('unitPrice')?.value || 0;
      currentTotal += (quantity * unitPrice);
    });
    this.totalSale.set(currentTotal);
  }

  save(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
      return;
    }

    const formValue = this.saleForm.value;

    const payload = {
      clientId: Number(formValue.clientId),
      branchId: Number(formValue.branchId),
      userId: Number(formValue.userId),
      details: formValue.details.map((d: any) => ({
        productId: Number(d.productId),
        quantity: Number(d.quantity),
        unitPrice: Number(d.unitPrice),
        loteId: Number(d.loteId)
      }))
    };

    console.log('Efectuando salida de almacén en OmniLink:', payload);
    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
