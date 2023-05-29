import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { EMPTY, catchError, tap } from 'rxjs';

import { AuthService } from '../auth.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  protected readonly formCtrl = this.fb.group({
    fullname: '',
    username: '',
    password: '',
  });

  protected status: null | 'loading' | 'success' = null;

  constructor(private auth: AuthService, private fb: NonNullableFormBuilder, private modalService: ModalService, private router: Router) { }

  protected onSubmit() {
    if (this.formCtrl.invalid) return;

    const value = this.formCtrl.getRawValue();
    this.auth.register(value.fullname, value.username, value.password).pipe(
      catchError(error => this.onError(error)),
      tap(() => this.onSuccess())
    ).subscribe();
  }

  private onError(error: HttpErrorResponse) {
    this.status = null;
    if (error.status !== 0) {
      this.modalService.showError(error.error.message);
    }
    return EMPTY;
  }

  private onSuccess() {
    this.status = 'success';
    this.router.navigate(['/login']);
  }
}
