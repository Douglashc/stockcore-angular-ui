import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public categoryForm!: FormGroup;
  public data = this.#dialogService.config().data; 

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.categoryForm = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      active: [true]
    });
  }

  save(): void {
    if (this.categoryForm.invalid) return;

    const payload = this.categoryForm.value;

    console.log('Enviando a la BD de OmniLink:', payload);

    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
