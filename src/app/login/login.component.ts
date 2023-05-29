import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EMPTY, catchError, tap } from 'rxjs';

import { AuthService } from '../auth.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected readonly formCtrl = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  protected status: null | 'loading' | 'success' = null;

  constructor(private fb: NonNullableFormBuilder, private auth: AuthService, private modalService: ModalService, private router: Router) { }

  protected onSubmit() {
    this.formCtrl.markAllAsTouched();
    if (this.formCtrl.invalid) return;

    const { username, password } = this.formCtrl.value;
    if (!username || !password) {
      throw new Error("username and password shouldn't be undefined");
    }

    this.status = 'loading';
    this.auth.login(username, password).pipe(
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
    this.router.navigate(['/']);
  }
}
