import { Injectable } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private bsModal: BsModalService) { }

  showError(message: string) {
    this.bsModal.show(ModalComponent, {
      initialState: { message }
    });
  }
}
