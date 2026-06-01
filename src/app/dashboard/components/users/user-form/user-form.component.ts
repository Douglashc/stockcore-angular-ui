import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  readonly #fb = inject(FormBuilder);
  readonly #dialogService = inject(DialogService);

  public usuarioForm!: FormGroup;
  public data = this.#dialogService.config().data;

  public rolesList = signal<{ id: number, name: string }[]>([
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Supervisor' },
    { id: 3, name: 'Almacenero' }
  ]);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const isEdit = !!this.data?.userId;

    this.usuarioForm = this.#fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      ci: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      // Validamos password dinámicamente según si es creación o edición
      password: ['', isEdit ? [] : [Validators.required, Validators.minLength(6)]],
      imageUrl: [''],
      roleId: [null, [Validators.required]]
    });
  }

  save(): void {
    if (this.usuarioForm.invalid) return;

    const formValue = this.usuarioForm.value;

    const payload = {
      ...formValue,
      roleId: Number(formValue.roleId),
      
      imageUrl: formValue.imageUrl || 'default-avatar.png'
    };

    console.log('Insertando/Actualizando usuario en OmniLink:', payload);
    this.#dialogService.close('REFRESH');
  }

  cancel(): void {
    this.#dialogService.close();
  }

}
