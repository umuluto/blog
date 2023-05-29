import { Component, ViewChild } from '@angular/core';

import { catchError, tap } from 'rxjs';

import { PostFormComponent } from '../post-form/post-form.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @ViewChild(PostFormComponent, { read: PostFormComponent }) form!: PostFormComponent;

  protected status: null | 'loading' | 'success' = null;

  constructor(private postService: PostService) { }

  protected onSubmit() {
    const value = this.form.formCtrl.value;

    if (!value.title || !value.content) {
      throw Error("title and content fields shouldn't be disabled");
    }

    const picture = this.form.getPicture();

    this.status = 'loading';
    const res = this.postService.createPost(
      value.title,
      value.content,
      value.description || undefined,
      picture instanceof File ? picture : undefined,
      value.category || undefined,
    ).pipe(
      tap(() => this.status = 'success'),
      catchError(error => (this.status = null, error))
    ).subscribe();
  }

  protected onReset() {
    this.form.formCtrl.reset();
  }
}
