import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public branchForm!: FormGroup;
  public data = this.#dialogService.config().data; 

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.branchForm = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      direction: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9\-+ ]+$/)]]
    });

    
  }

  save(): void {
    if (this.branchForm.invalid) return;

    const payload = this.branchForm.value;
    console.log('Enviando DTO de Branch a la API de .NET Core:', payload);

    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
