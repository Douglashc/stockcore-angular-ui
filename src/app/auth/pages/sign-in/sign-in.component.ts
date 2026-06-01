import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  private readonly fb = inject( FormBuilder );
  private readonly router = inject( Router );
  authForm!: (FormGroup);
  loading: boolean = false;
  showPassword = false;


  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get usernameInvalid(): boolean {
    const field = this.authForm.get('username');
    return !!(field?.invalid && field?.touched);
  }

  get passwordInvalid(): boolean {
    const field = this.authForm.get('password');
    return !!(field?.invalid && field?.touched);
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    console.log('Enviando datos al backend...', this.authForm.value);

    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.router.navigate(['dashboard/summary']);
  }

}
