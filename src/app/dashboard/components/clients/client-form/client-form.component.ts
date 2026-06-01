import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public clientForm!: FormGroup;
  public data = this.#dialogService.config().data; 

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.clientForm = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      ci: ['', [Validators.required, Validators.minLength(5)]],
      nit: ['']
    });

  }

  save(): void {
    if (this.clientForm.invalid) return;

    const payload = this.clientForm.value;
    console.log('Enviando DTO de Client a la API de .NET Core:', payload);

    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
