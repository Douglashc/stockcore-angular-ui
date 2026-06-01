import { Component, signal, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-lote-form',
  templateUrl: './lote-form.component.html',
  styleUrls: ['./lote-form.component.scss']
})
export class LoteFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public loteForm!: FormGroup;
  public data = this.#dialogService.config().data; 

  public productsList = signal<{ id: number, name: string }[]>([
    { id: 1, name: 'Lavandina para Piso' },
    { id: 2, name: 'Destornillador Phillips' },
    { id: 4, name: 'Guantes de Nitrilo' },
    { id: 5, name: 'Jabon OMO' }
  ]);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    const today = new Date().toISOString().split('T')[0];

    this.loteForm = this.#fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      purchaseDate: [today, [Validators.required]],
      expirationDate: ['', [Validators.required]],
      cost: [0, [Validators.required, Validators.min(1)]],
      productId: [null, [Validators.required]]
    });
  }

  save(): void {
    if (this.loteForm.invalid) return;

    const formValue = this.loteForm.value;

    const payload = {
      ...formValue,
      purchaseDate: new Date(formValue.purchaseDate).toISOString(),
      expirationDate: new Date(formValue.expirationDate).toISOString(),
      productId: Number(formValue.productId),
      cost: Number(formValue.cost)
    };

    console.log('Enviando DTO a la API de .NET Core:', payload);
    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
