import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public supplierForm!: FormGroup;
  public data = this.#dialogService.config().data; 

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.supplierForm = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      nit: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9\-+ ]+$/)]],
      email: ['', [Validators.email]],
      webUrl: [''],
      active: [true]
    });


  }

  save(): void {
    if (this.supplierForm.invalid) return;

    const payload = this.supplierForm.value;
    console.log('Enviando DTO de Supplier a la API de .NET Core:', payload);

    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
