import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { PostService } from '../post.service';

interface Image {
  src: string,
  file: File,
}

function isImage(obj: Image | string | null): obj is Image {
  return obj !== null && typeof obj !== 'string';
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  readonly formCtrl = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    content: ['', Validators.required],
    category: this.fb.control<string | null>(null),
  })

  @Input() status: null | 'loading' | 'success' = null;

  @Output() readonly appSubmit = new EventEmitter<void>();
  @Output() readonly appReset = new EventEmitter<void>();
  
  protected readonly categories$ = inject(PostService).getCategories();
  
  protected get title() { return this.formCtrl.controls.title }
  protected get description() { return this.formCtrl.controls.description }
  protected get content() { return this.formCtrl.controls.content }
  protected get category() { return this.formCtrl.controls.category }
  
  @ViewChild('inputPicture', { read: ElementRef }) private pictureInput!: ElementRef;
  private _picture: null | string | Image = null;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  getPicture() {
    if (isImage(this._picture)) {
      return this._picture.file;
    }

    return this._picture;
  }

  setPicture(picture: string | null) {
    if (isImage(this._picture)) {
      URL.revokeObjectURL(this._picture.src);
      (this.pictureInput.nativeElement as HTMLInputElement).value = '';
    }

    this._picture = picture;
  }

  protected onPictureChange(files: FileList | null) {
    if (isImage(this._picture)) {
      URL.revokeObjectURL(this._picture.src);
    }

    const file = files?.item(0);
    if (!file) {
      this._picture = null;
      return;
    }

    const src = URL.createObjectURL(file);
    this._picture = { file, src };
  }

  protected onPictureClear() {
    this.setPicture(null);
  }

  protected get pictureSrc() {
    if (this._picture === null) {
      return null;
    }

    if (typeof this._picture === 'string') {
      return this._picture;
    }

    return this.sanitizer.bypassSecurityTrustUrl(this._picture.src);
  }

  protected onSubmit() {
    this.formCtrl.markAllAsTouched();
    if (this.formCtrl.invalid) return;

    this.appSubmit.emit();
  }
}
