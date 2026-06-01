import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public productForm!: FormGroup;
  public data = this.#dialogService.config().data;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.productForm = this.#fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required]],
      description: [''],
      salePrice: [0, [Validators.required, Validators.min(0.1)]],
      imageUrl: [''],
      categoryId: [null, [Validators.required]],
      handlesBatches: [true]
    });
  }

  save(): void {
    if (this.productForm.invalid) return;
    
    const payload = this.productForm.value;
    // Aquí disparas tu HTTP POST/PUT hacia tu backend
    
    // Al guardar con éxito, cerramos mandando el token para refrescar la lista
    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
