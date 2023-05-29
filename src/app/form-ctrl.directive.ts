import { Directive, HostBinding } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[appFormCtrl]',
})
export class FormCtrlDirective {
  // @HostBinding('class.is-valid') get valid() { return this.host.control.valid && this.host.control.touched; }
  @HostBinding('class.is-invalid') get invalid() { return this.host.control.invalid && this.host.control.touched; }

  constructor(private host: FormControlName) { }
}
