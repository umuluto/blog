import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { map, take, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const modalService = inject(ModalService);

  return inject(AuthService).auth$.pipe(
    take(1),
    map(auth => auth ? true : router.parseUrl('/')),
    tap(auth => {
      if (auth instanceof UrlTree) {
        modalService.showError("You must login first to access that page");
      }
    })
  );
};
